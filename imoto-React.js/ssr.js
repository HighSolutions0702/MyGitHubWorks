import 'isomorphic-fetch'
import http from 'http'
import proxy from 'express-http-proxy'
import express from 'express'
import cookieParser from 'cookie-parser'
import serialize from 'serialize-javascript'
import { imagePath } from 'utils/helpers'

import React                                         from 'react'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { renderToString }                            from 'react-dom/server'
import { configureRoutes }                           from 'src/routes'
import configureStore                                from 'store/configureStore.js'
import { syncHistoryWithStore }                      from 'react-router-redux'
import sagaMiddleware                                from 'middlewares/sagaMiddleware'
import rootSaga                                      from 'sagas'
import { END }                                       from 'redux-saga'
import config                                        from 'constants/config'

import ApolloClient, { createNetworkInterface }      from 'apollo-client'
import { ApolloProvider }                            from 'react-apollo'
import { getDataFromTree }                           from 'react-apollo/server'

const HTML = ({ content, store, apolloInitialState, jsBuildPath, cssBuildPath }) => (
  <html lang="en">
    <head>
      <title>Imoto</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href={imagePath('/icons/favicon.png')} rel="shortcut icon" type="image/x-icon" />
      {
        process.env.APP_ENV !== 'development' &&
        <link href={`${config.CLIENT_HOST}/${cssBuildPath}`} rel="stylesheet" />
      }
    </head>
    <body>
      <div id="app" dangerouslySetInnerHTML={{ __html: content }} />
      <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(store.getState())};` }} />
      <script dangerouslySetInnerHTML={{ __html: `window.__APOLLO_STATE__=${serialize(apolloInitialState)};` }} />
      <script src={`${config.CLIENT_HOST}/${jsBuildPath}`} />
    </body>
  </html>
)
const PORT = 3000

// The server code must export a function
// (`parameters` may contain some miscellaneous library-specific stuff)
export default function (parameters) {
  const jsBuildPath = parameters.chunks().javascript.main
  const cssBuildPath = parameters.chunks().styles.main

  // Create HTTP server
  const app = new express()
  const server = new http.Server(app)

  app.use(express.static('dist'))
  app.use(express.static('public'))
  app.use(cookieParser())

  app.use('/ewarp/', proxy(config.EWARP_API_HOST, {
    proxyReqPathResolver: req => '/ewarp/'
  }))

  app.use((req, res) => {
    const networkInterface = createNetworkInterface({
      uri: config.API_HOST,
      opts: {
        credentials: 'include',
        // transfer ONLY cookies (https://github.com/matthew-andrews/isomorphic-fetch/issues/83)
        headers: {
          cookie: req.headers.cookie
        },
        transportBatching: true
      }
    })

    // networkInterface.use([{
    //   applyMiddleware(req, next) {
    //     console.log(util.inspect(req, false, null))
    //     next()
    //   }
    // }])

    const client = new ApolloClient({
      ssrMode: true,
      networkInterface
    })
    const memoryHistory = createMemoryHistory(req.url)
    function getRole() {
      if (req.cookies['customer.id']) {
        return 'Customer'
      } else if (req.cookies['photographer.id']) { return 'Photographer' }
      return null
    }
    const storeInitialState = {
      currentUser: {
        isLoggedIn: !!req.cookies['customer.id'] || !!req.cookies['photographer.id'], // We might need something more clever than checking the token presence.
        role: getRole()
      }
    }
    const store = configureStore({
      history: memoryHistory,
      apolloClient: client
    }, storeInitialState)

    const history = syncHistoryWithStore(memoryHistory, store)
    match({ history, routes: configureRoutes(store), location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        const RootComponent = (
          <ApolloProvider store={store} client={client}>
            <RouterContext {...renderProps} />
          </ApolloProvider>
        )
        const rootTask = sagaMiddleware.run(rootSaga)

        // There are actually 2 stores bound to context
        // context.store - app redux store
        // context.client.store - redux store from apollo
        //
        // We need to use context.client.store to prepopulate apollo initial state on the client
        // See https://github.com/apollostack/react-apollo/issues/210

        // Rendering TWICE, refer to https://github.com/yelouafi/redux-saga/issues/354
        renderToString(RootComponent)
        store.dispatch(END)

        rootTask.done.then(() => {
          getDataFromTree(RootComponent).then((context) => {
            const content = renderToString(RootComponent)
            const raw = renderToString(
              <HTML
                content={content}
                store={context.store}
                apolloInitialState={{ apollo: { data: context.client.store ? context.client.store.getState().apollo.data : {} } }}
                jsBuildPath={jsBuildPath}
                cssBuildPath={cssBuildPath}
              />
            )

            res.status(200)
            res.send(`<!doctype html>\n${raw}`)
            res.end()
          }).catch((error) => res.status(500).send(error.message))
        }).catch((error) => res.status(500).send(error.message))
      } else {
        res.status(404).send('Not Found.')
      }
    })
  })

  // Start the HTTP server
  server.listen(PORT, function () {
    console.log(`Server listening on http://localhost:${PORT}, Ctrl+C to stop`)
  })
}

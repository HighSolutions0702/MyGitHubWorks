import 'flexboxgrid/dist/flexboxgrid.css'

import React from 'react'
import { render } from 'react-dom'
import configureStore from 'store/configureStore'
import { Router, browserHistory, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import sagaMiddleware from 'middlewares/sagaMiddleware'
import rootSaga from 'sagas'
import { configureRoutes } from 'src/routes'
import { ApolloProvider } from 'react-apollo'
import { client } from 'apollo'

require('styles/global.css')
require('normalize.css')
require('slick-carousel/slick/slick.css')
require('slick-carousel/slick/slick-theme.css')

const store = configureStore({
  history: browserHistory,
  apolloClient: client
}, window.__initialState__)

const history = syncHistoryWithStore(browserHistory, store)
window.Store = store

sagaMiddleware.run(rootSaga)

render(
  <ApolloProvider store={store} client={client}>
    <Router history={history} routes={configureRoutes(store)} />
  </ApolloProvider>,
  document.getElementById('app')
)

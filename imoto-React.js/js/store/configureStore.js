import { createStore, applyMiddleware, compose } from 'redux'
import createLogger from 'redux-logger'
import createRootReducer from 'reducers'
import sagaMiddleware from 'middlewares/sagaMiddleware'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'

export default function configureStore({ history, apolloClient }, initialState) {
  const loggerMiddleware = createLogger({ duration: true })
  const middlewares = [
    loggerMiddleware,
    routerMiddleware(history),
    sagaMiddleware
  ]

  const finalCreateStore = compose(applyMiddleware(...middlewares))(createStore)

  return finalCreateStore(createRootReducer(apolloClient), initialState)
}

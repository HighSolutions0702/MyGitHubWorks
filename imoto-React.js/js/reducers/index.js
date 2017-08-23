import { combineReducers } from 'redux'
import ApolloClient from 'apollo-client'
import rootReducer from 'reducers/rootReducer'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

export default function createRootReducer(apolloClient) {
  return combineReducers({
    routing: routerReducer,
    apollo: apolloClient.reducer(),
    form: formReducer,
    ...rootReducer
  })
}

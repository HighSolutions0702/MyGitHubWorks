import { client as apolloClient } from 'apollo'
import * as queries from 'apollo/queries'

export default function* (params = {}) {
  const queryBody = params.parameters ?
    queries[params.query](params.parameters) : queries[params.query]
  const customApolloClient = (params.skipCache === true) ? apolloClient.networkInterface : apolloClient

  return yield customApolloClient.query(
    { query: queryBody, variables: params.variables || null }
  )
}

import config from 'constants/config'
import ApolloClient from 'apollo-client'
// Note that createNetworkInterface is imported from our own monkey-patched networkInterface
// This is important for uploading files through XHR
import createNetworkInterface from 'utils/apollo/networkInterface'
import R from 'ramda'
import { print as printGraphQL } from 'graphql/language/printer'

const networkInterface = createNetworkInterface({
  uri: config.API_HOST,
  opts: {
    credentials: 'include',
    transportBatching: true
  }
})

const formDataMiddleware = {
  applyMiddleware(req, next) {
    const { request: { query, variables } } = req

    const formData = new FormData()
    formData.append('query', printGraphQL(query))
    const formDataVariables = R.mapObjIndexed((value, key) => {
      if (value instanceof File) {
        formData.append(`attachments[${key}]`, value)
        return `#!file:${key}`
      }
      return value
    }, variables)
    formData.append('variables', JSON.stringify(formDataVariables || {}))

    req.options.body = formData
    return next()
  }
}

networkInterface.use([formDataMiddleware])

const client = new ApolloClient({
  networkInterface
})

export default client

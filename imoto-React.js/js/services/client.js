import config from 'constants/config'
import { Base64 } from 'js-base64'
import 'isomorphic-fetch'
import Frisbee from 'frisbee'
import shortid from 'shortid'

function RPCError(code, message) {
  this.name = 'RPCError'
  this.message = (message || '')
  this.code = (code || -32603)
}
RPCError.prototype = new Error()

const options = {
  baseURI: '/ewarp',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `EWS ${config.EWARP_API_USER}:${Base64.encode(
      config.EWARP_API_PASS)}`,
    'Access-Control-Allow-Origin': '*'
  },
  methods: [
    { name: 'createOrder' },
    { name: 'addMaterialsForBatch' },
    { name: 'batchReadyForProduction' }
  ]
}

class eWarpAPI extends Frisbee {
  constructor(opts) {
    super(opts)

    this.opts.methods.reduce((result, method) => {
      this[method.name] = (params) => {
        const payload = {
          jsonrpc: '2.0',
          method: `${method.name}`,
          id: shortid.generate(),
          params
        }
        return this.post('/', {
          body: JSON.stringify(payload)
        }).then(({ response, body }) => {
          if (typeof body === 'object') {
            const r = body.result
            const error = body.error
            if (r !== undefined) {
              return r
            } else if (error !== undefined) {
              if (typeof error === 'object' && error.code && error.message) {
                throw new RPCError(error.code, error.message)
              } else {
                throw new RPCError(-32700,
                    'Unable to parse the response error message')
              }
            } else {
              throw new RPCError(-32700, 'Unable to parse the response')
            }
          } else {
            throw new RPCError(-32700, 'Unable to parse the response')
          }
        })
      }
      return result
    }, {},
    )
  }

}

const client = new eWarpAPI(options)

export default client

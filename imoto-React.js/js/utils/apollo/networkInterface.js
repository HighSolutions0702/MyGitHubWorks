import { HTTPFetchNetworkInterface } from 'apollo-client/transport/networkInterface'
import types from 'constants/actionTypes'
import R from 'ramda'

// small hack, I don't want to override another method from Apollo :(
export class CustomResponse {
  constructor(response) {
    this.rawResponse = response
  }

  json() {
    return Promise.resolve(JSON.parse(this.rawResponse))
  }
}

function extractFileId(request) {
  const ids = R.values(R.filter((i) => (!!i),
      (request.request && request.request.variables &&
       R.mapObjIndexed((v, k) => v instanceof File && v.id,
        request.request.variables)) || []))
  return (ids && ids.length > 0) ? ids[0] : null
}

export class XHRNetworkInterface extends HTTPFetchNetworkInterface {
  fetchFromRemoteEndpoint(request) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      R.mapObjIndexed((value, key) => xhr.setRequestHeader(key, value), this._opts.headers)
      xhr.withCredentials = true
      xhr.open('POST', this._uri)
      xhr.onload = () => resolve(xhr.responseText)
      xhr.onerror = reject
      xhr.upload.onprogress = event => {
        const id = extractFileId(request)
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100)
          window.Store.dispatch({ type: types.UPLOAD_PROGRESS, payload: { id, percent } })
        }
      }
      xhr.send(request.options.body)
    }).then(response => new CustomResponse(response))
  }
}

export default function createNetworkInterface({ uri, opts }) {
  return new XHRNetworkInterface(uri, opts)
}

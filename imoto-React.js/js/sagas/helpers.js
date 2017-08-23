import { GOOGLE_CALENDAR_API_URL } from 'constants/constants'
import config from 'constants/config'
import geocoder from 'google-geocoder'
import R from 'ramda'
import request from 'superagent'

export const getCoordinates = ({ address, city, zipCode, state }) => new Promise((resolve, reject) => {
  const location = {}
  const geo = geocoder({
    key: config.GOOGLE_KEY_API
  })
  geo.find(`${address} ${city} ${zipCode} ${state}`, (err, res) => {
    location.coordinates = res[0] ? res[0].location : null
    location.fullAddress = res[0] && res[0].route && res[0].street_number ? `${res[0].route.long_name} ${res[0].street_number.long_name}` : null
    resolve(location)
  })
})

export function persistToStorage(key, data) {
  return new Promise((resolve) => {
    localStorage.setItem(`${config.STORAGE_NAMESPACE}/${key}`, JSON.stringify(data))
    resolve()
  })
}

export function clearStorage(key) {
  return new Promise((resolve) => {
    localStorage.setItem(`${config.STORAGE_NAMESPACE}/${key}`, JSON.stringify({}))
    resolve()
  })
}

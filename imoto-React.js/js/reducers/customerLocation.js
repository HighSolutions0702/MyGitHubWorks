import types from 'constants/actionTypes'

const initialState = {}

export default function customerLocation(state = initialState, action = {}) {
  const { type } = action
  switch (type) {
    case types.SET_CUSTOMER_LOCATION:
      return action.payload
    default:
      return state
  }
}

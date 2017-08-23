import types from 'constants/actionTypes'

const initialState = {}

export default function orderFromServer(state = initialState, action = {}) {
  const { type } = action
  switch (type) {
    case types.GET_CURRENT_ORDER_INFO_SUCCESS:
      return action.payload.order
    default:
      return state
  }
}

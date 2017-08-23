import types from 'constants/actionTypes'

const initialState = true

export default function opacityHeader(state = initialState, action = {}) {
  const { type } = action
  switch (type) {
    case types.SHOW_OPACITY_HEADER:
      return true
    case types.HIDE_OPACITY_HEADER:
      return false
    default:
      return state
  }
}

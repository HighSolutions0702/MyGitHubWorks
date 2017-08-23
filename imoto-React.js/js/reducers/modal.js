import types from 'constants/actionTypes'
import R from 'ramda'

const initialState = { component: null, show: false, payload: {} }

export default function modal(state = initialState, action = {}) {
  const { type } = action

  switch (type) {
    case types.SHOW_MODAL:
      return R.assoc('show', true, R.merge(initialState, action.payload))
    case types.HIDE_MODAL:
      return initialState
    default:
      return state
  }
}

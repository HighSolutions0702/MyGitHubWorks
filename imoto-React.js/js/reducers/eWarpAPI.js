import types from 'constants/actionTypes'
import R from 'ramda'

const initialState = { }

export default function eWarpAPI(state = initialState, action = {}) {
  const { type, payload } = action

  switch (type) {
    case types.EWARP_CREATE_ORDER:
      return state
    case types.EWARP_CREATE_ORDER_SUCCESS:
      return R.merge(state, { createdOrder:action.payload })
    case types.EWARP_ADD_MATERIALS_FOR_BATCH_SUCCESS:
      return R.merge(state, { materialsAdded:true })
    case types.EWARP_ADD_MATERIALS_FOR_BATCH_FAILURE:
      return R.merge(state, { materialsAdded:false })
    case types.EWARP_BATCH_READY_FOR_PRODUCTION_SUCCESS:
      return R.merge(state, { readyForProcessing:true })
    default: return state
  }
}

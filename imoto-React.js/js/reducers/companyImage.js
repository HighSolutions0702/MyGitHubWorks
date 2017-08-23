import types from 'constants/actionTypes'

const initialState = {}

export default function companyImage(state = initialState, action = {}) {
  const { type } = action

  switch (type) {
    case types.UPLOAD_COMPANY_IMAGE:
      return action.payload
    case types.CLEAR_COMPANY_IMAGE:
      return initialState
    default:
      return state
  }
}

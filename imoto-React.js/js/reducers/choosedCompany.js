import types from 'constants/actionTypes'

const initialState = {}

export default function choosedCompany(state = initialState, action = {}) {
  const { type } = action

  switch (type) {
    case types.SET_REGISTRATION_COMPANY:
      return action.payload
    case types.CREATE_NEW_PENDING_COMPANY:
      return action.payload
    case types.RESET_REGISTRATION_COMPANY:
      return initialState
    default:
      return state
  }
}

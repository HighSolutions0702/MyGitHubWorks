import types from 'constants/actionTypes'
import R from 'ramda'

const initialState = {}

export default function companyBranches(state = initialState, action = {}) {
  const { type } = action

  switch (type) {
    case types.GET_COMPANY_BRANCHES_SUCCESS:
      return action.payload
    case types.RESET_REGISTRATION_COMPANY:
      return initialState
    default:
      return state
  }
}

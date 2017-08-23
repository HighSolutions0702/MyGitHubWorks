import types from 'constants/actionTypes'

const initialState = { isLoggedIn: false }

export default function currentUser(state = initialState, action = {}) {
  const { type, payload } = action

  function getCurrentUserRole() {
    if (payload && payload.user && payload.user.user && payload.user.user.role) { return payload.user.user.role }
    return 'Customer'
  }

  const role = getCurrentUserRole()
  switch (type) {
    case types.AGENT_REGISTRATION_SUCCESS:
    case types.HOMEOWNER_REGISTRATION_SUCCESS:
    case types.USER_LOGIN_SUCCESS:
      return { isLoggedIn: true, role }
    case types.USER_LOGOUT_SUCCESS:
      return { isLoggedIn: false, role: null }
    default:
      return state
  }
}

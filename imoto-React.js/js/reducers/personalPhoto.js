import types from 'constants/actionTypes'

const initialState = {}

export default function personalPhoto(state = initialState, action = {}) {
  const { type } = action

  switch (type) {
    case types.UPLOAD_PERSONAL_PHOTO:
      return action.payload
    case types.CLEAR_PERSONAL_PHOTO:
      return initialState
    default:
      return state
  }
}

import types from 'constants/actionTypes'
import R from 'ramda'

const initialState = { creditCards:[] }


export default function creditCard(state = initialState, action = {}) {
  const { type, payload } = action

  switch (type) {
    case types.INIT_CREDIT_CARDS:
      return R.merge(state, { creditCards:payload || [] })
    case types.ADD_CREDIT_CARD_SUCCESS:
      return R.merge(state, { creditCards:R.prepend(payload, state.creditCards) })
    case types.REMOVE_CREDIT_CARD_SUCCESS:
      return R.merge(state, { creditCards:R.without([R.find(R.propEq('id', payload.id))(state.creditCards)], state.creditCards) })
    default:
      return state
  }
}

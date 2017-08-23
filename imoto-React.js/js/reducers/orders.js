import R from 'ramda'
import types from 'constants/actionTypes'

const initialState = {
  list: [
    {
      id: 4021,
      address: '5938 Watercrest Way',
      date: '09/18/16',
      status: 'Pending',
      isOpenedInformContainer: false
    },
    {
      id: 4009,
      address: '321 Front St, Unit 32',
      date: '09/17/16',
      status: 'Ready for Delivery',
      isOpenedInformContainer: false
    }
  ],
  initialList: [
    {
      id: 4021,
      address: '5938 Watercrest Way',
      date: '09/18/16',
      status: 'Pending',
      isOpenedInformContainer: false
    },
    {
      id: 4009,
      address: '321 Front St, Unit 32',
      date: '09/17/16',
      status: 'Ready for Delivery',
      isOpenedInformContainer: false
    }
  ]
}

export default function orders(state = initialState, action = {}) {
  const { type } = action
  switch (type) {
    case types.FILTER_ORDERS_LIST: {
      return {
        initialList: state.initialList,
        list: state.initialList.filter(item =>
          (item.address && item.address.toLowerCase().includes(action.payload)) ||
          (item.id && item.id.toString().includes(action.payload)) ||
          (item.status && item.status.toLowerCase().includes(action.payload))
        )
      }
    }
    case types.SHOW_ORDER_INFORM_CONTAINER:
      return {
        initialList: state.initialList,
        list: state.list.map(item => (
          action.payload === item.id ? R.merge(item, { isOpenedInformContainer: true }) : item
        ))
      }
    case types.CLOSE_ORDER_INFORM_CONTAINER:
      return {
        initialList: state.initialList,
        list: state.list.map(item => (
          action.payload === item.id ? R.merge(item, { isOpenedInformContainer: false }) : item
        ))
      }
    case types.SHOW_OPTIONS_BLOCK:
      return {
        initialList: state.initialList,
        list: state.list.map(item => (
          R.merge(item, { isOpenedOptionsBlock: action.payload === item.id && !item.isOpenedOptionsBlock })
        ))
      }
    case types.CLOSE_OPTIONS_BLOCK:
      return {
        initialList: state.initialList,
        list: state.list.map(item => R.merge(item, { isOpenedOptionsBlock: false }))
      }
    case types.SAVE_ORDER_HISTORY_DATA:
      return {
        initialList: action.payload.map(item => R.merge(item, { isOpenedInformContainer: false })),
        list: action.payload.map(item => R.merge(item, { isOpenedInformContainer: false }))
      }
    default:
      return state
  }
}

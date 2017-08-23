import types from 'constants/actionTypes'
import Alert from 'utils/alert'
import { browserHistory } from 'react-router'
import { mutate, query } from 'apollo'
import { delay } from 'redux-saga'
import { initialize } from 'redux-form'
import { call, put, select } from 'redux-saga/effects'
import { setErrorMessage, setPlaceOrderFormValue, setProductListForm } from 'utils/helpers'
import * as selectors from './selectors'
import { getCoordinates, persistToStorage, clearStorage } from './helpers'

export function* getCurrentLocation(action) {
  const { coordinates, fullAddress } = yield call(getCoordinates, action.payload)
  yield put({ type: types.SET_CUSTOMER_LOCATION, payload: { coordinates, fullAddress } })
  yield put({ type: types.SHOW_MODAL, payload: { component: 'MapContainer' } })
}

export function* addDiscountCode(action) {
  const { values, resolve, reject } = action.payload
  const placeOrder = yield select(selectors.placeOrder)
  const modifiedValues = Object.assign(values, { orderId: placeOrder.id })
  try {
    const { data } = yield call(mutate, {
      mutation: 'AddDiscountCode',
      variables: modifiedValues
    })
    yield put({ type: types.ADD_DISCOUNT_CODE_SUCCESS, payload: data })
    Alert.success('The discount code has been successfully applied')
    resolve()
  } catch (error) {
    Alert.error(setErrorMessage(error))
    reject()
    yield put({ type: types.ADD_DISCOUNT_CODE_FAILURE })
  }
}

export function* createEmptyOrder(action) {
  try {
    const { data, error } = yield call(mutate, {
      mutation: 'InitialEmptyOrder'
    })
    yield put({ type: types.CREATE_INITIAL_EMPTY_ORDER_SUCCESS, payload: data })
    yield call(persistToStorage, 'orderId', data.InitialEmptyOrder.order.id)
  } catch (error) {
    Alert.error(setErrorMessage(error))
    yield put({ type: types.CREATE_INITIAL_EMPTY_ORDER_FAILURE })
  }
}

export function* currentOrderInfo(action) {
  try {
    const { data, error } = yield call(query, {
      query: 'getCurrentOrder',
      parameters: {
        id: action.payload
      }
    })
    yield put({ type: types.GET_CURRENT_ORDER_INFO_SUCCESS, payload: data })
  } catch (error) {
    Alert.error(setErrorMessage(error))
    yield put({ type: types.GET_CURRENT_ORDER_INFO_FAILURE })
  }
}

export function* orderProducts(action) {
  const placeOrder = yield select(selectors.placeOrder)
  const initialProductForm = yield select(selectors.selectProductForm)
  try {
    const { data, error } = yield call(query, {
      query: 'getOrderProducts',
      parameters: {
        id: placeOrder.id
      }
    })
    yield put({ type: types.GET_ORDER_PRODUCTS_SUCCESS, payload: data })
    yield put(initialize('order-select-products', setPlaceOrderFormValue(data, initialProductForm)))
  } catch (error) {
    Alert.error(setErrorMessage(error))
    yield put({ type: types.GET_ORDER_PRODUCTS_FAILURE })
  }
}

export function* initialProductList(action) {
  const placeOrder = yield select(selectors.placeOrder)
  try {
    const { data, error } = yield call(query, {
      query: 'productsWithAttributes'
    })
    yield put({ type: types.GET_INITIAL_PRODUCTS_LIST_SUCCESS, payload: data })
    yield put({ type: types.GET_ORDER_PRODUCTS_REQUEST, payload: placeOrder.id })
  } catch (error) {
    Alert.error(setErrorMessage(error))
    yield put({ type: types.GET_INITIAL_PRODUCTS_LIST_FAILURE })
  }
}

export function* zipCodeValidation(action) {
  const { resolve, reject, values } = action.payload
  try {
    const { data, error } = yield call(mutate, {
      mutation: 'ZipcodeValidation',
      variables: {
        value: values.zipCode,
        stateName: values.state
      }
    })
    yield put({ type: types.ZIP_CODE_VALIDATION_SUCCESS, payload: values })
    resolve()
  } catch (error) {
    Alert.error(setErrorMessage(error))
    yield put({ type: types.ZIP_CODE_VALIDATION_FAILURE })
    reject()
  }
}

export function* updateListingDetails(action) {
  const placeOrder = yield select(selectors.placeOrder)
  const values = Object.assign(placeOrder.listingDetails, {
    id: placeOrder.id,
    currentStep: `${placeOrder.currentStep}`,
    activeStep: `${placeOrder.activeStep}`
  })
  try {
    const { data, error } = yield call(mutate, {
      mutation: 'ListingOrderDetails',
      variables: values
    })
    yield put({ type: types.UPDATE_LISTING_DETAILS_SUCCESS, payload: data })
    yield put({ type: types.HIDE_MODAL })
    yield put({ type: types.COLLAPSE_ORDER_STEP, payload: 'listing-details' })
    yield delay(500)
    yield put({ type: types.COLLAPSE_ORDER_STEP, payload: '' })
    yield put({ type: types.CHANGE_PLACE_ORDER_ACTIVE_STEP, payload: 2 })
    yield put({ type: types.CHANGE_PLACE_ORDER_CURRENT_STEP, payload: 2 })
  } catch (error) {
    Alert.error(setErrorMessage(error))
    yield put({ type: types.UPDATE_LISTING_DETAILS_FAILURE })
  }
}

export function* submitProductList(action) {
  const placeOrder = yield select(selectors.placeOrder)
  const { values, resolve, reject } = action.payload
  const valueObj = setProductListForm(values)
  const modifiedValues = Object.assign(
    valueObj, {
      orderId: placeOrder.id,
      currentStep: `${placeOrder.currentStep}`,
      activeStep: `${placeOrder.activeStep}`
    })

  try {
    const { data, error } = yield call(mutate, {
      mutation: 'ProductOrderDetails',
      variables: modifiedValues
    })
    yield put({ type: types.SUBMIT_PRODUCT_LIST_SUCCESS, payload: data })
    resolve()
  } catch (error) {
    Alert.error(setErrorMessage(error))
    yield put({ type: types.SUBMIT_PRODUCT_LIST_FAILURE })
    reject()
  }
}

export function* initialPhotographersAvailability(action) {
  const placeOrder = yield select(selectors.placeOrder)

  try {
    const { data, error } = yield call(query, {
      query: 'getAvailablePhotographers',
      skipCache: true,
      parameters: {
        orderId: placeOrder.id
      }
    })

    yield put({ type: types.GET_INITIAL_AVAILABLE_PHOTOGRAPHERS_SUCCESS, payload: data })
    if (data.available_photographers.length) {
      yield put({ type: types.COLLAPSE_ORDER_STEP, payload: 'select-products' })
      yield delay(500)
      yield put({ type: types.COLLAPSE_ORDER_STEP, payload: '' })
      yield put({ type: types.CHANGE_PLACE_ORDER_ACTIVE_STEP, payload: 3 })
      yield put({ type: types.CHANGE_PLACE_ORDER_CURRENT_STEP, payload: 3 })
    } else {
      yield put({ type: types.SHOW_MODAL, payload:{ component: 'PhotographersIsNotAvailable' } })
    }
  } catch (error) {
    Alert.error(setErrorMessage(error))
    yield put({ type: types.GET_INITIAL_AVAILABLE_PHOTOGRAPHERS_FAILURE })
  }
}

export function* photographersAvailability(action) {
  const placeOrder = yield select(selectors.placeOrder)
  const { resolve, reject, values: { date, time } } = action.payload
  try {
    const { data, error } = yield call(query, {
      query: 'getAvailablePhotographers',
      parameters: {
        date,
        time,
        orderId: placeOrder.id
      }
    })
    yield put({ type: types.GET_AVAILABLE_PHOTOGRAPHERS_SUCCESS, payload: data })
    resolve()
  } catch (error) {
    Alert.error(setErrorMessage(error))
    yield put({ type: types.GET_AVAILABLE_PHOTOGRAPHERS_FAILURE })
    reject()
  }
}

export function* setOrderPhotographers(action) {
  const placeOrder = yield select(selectors.placeOrder)
  const { resolve, reject, values } = action.payload
  const timeRange = values[`timeRange${values.photographerId}`]

  try {
    const { data, error } = yield call(mutate, {
      mutation: 'PhotographerOrderDetails',
      variables: {
        photographerId: values.photographerId,
        timeRange,
        orderId: placeOrder.id
      }
    })
    yield put({ type: types.SET_ORDER_CREDIT_CARD_SUCCESS, payload: data })
    yield put({ type: types.COLLAPSE_ORDER_STEP, payload: 'schedule-photographer' })
    yield delay(500)
    yield put({ type: types.COLLAPSE_ORDER_STEP, payload: '' })
    yield put({ type: types.CHANGE_PLACE_ORDER_ACTIVE_STEP, payload: 4 })
    yield put({ type: types.CHANGE_PLACE_ORDER_CURRENT_STEP, payload: 4 })
    resolve()
  } catch (error) {
    Alert.error(setErrorMessage(error))
    yield put({ type: types.SET_ORDER_CREDIT_CARD_FAILURE })
    reject()
  }
}

export function* setPaymentInformation(action) {
  const placeOrder = yield select(selectors.placeOrder)
  const { resolve, reject, values } = action.payload

  values.amount = 0
  for (const orderSummaryItem of placeOrder.orderSummary) {
    values.amount += orderSummaryItem.price
  }

  try {
    const { data, error } = yield call(mutate, {
      mutation: 'CreatePaymentTransaction',
      variables: values
    })
    yield put({ type: types.COLLAPSE_ORDER_STEP, payload: '??' })
    yield delay(500)
    yield put({ type: types.COLLAPSE_ORDER_STEP, payload: '' })
    resolve()
  } catch (error) {
    Alert.error(setErrorMessage(error))
    reject()
  }
}

export function* saveOrderOnSecondStep(action) {
  try {
    yield call(clearStorage, 'orderId')
    yield put({ type: types.HIDE_MODAL })
    yield put({ type: types.RESET_PLACE_ORDER })
    browserHistory.push('/account')
  } catch (error) {
    Alert.error(error)
  }
}

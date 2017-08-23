import { call, put, select } from 'redux-saga/effects'
import { mutate, query } from 'apollo'
import types from 'constants/actionTypes'
import Alert from 'utils/alert'
import R from 'ramda'
import { setErrorMessage } from 'utils/helpers'
import * as selectors from './selectors'

export function* getOrder(action) {
  try {
    const { data, error } = yield call(query, {
      query: 'getOrder',
      parameters: {
        id: action.payload.order_id
      },
      variables: {
        withAttachments: false
      }
    })
    yield put({ type: types.GET_ORDER_FOR_UPLOAD_SUCCESS, payload: data })
  } catch (error) {
    Alert.error(setErrorMessage(error))
    yield put({ type: types.GET_ORDER_FOR_UPLOAD_FAILURE })
  }
}

export function* updateOrderStatus(action) {
  const { orderId, status } = action.payload
  try {
    const { data:{ UpdateStatus } } = yield call(mutate, {
      mutation: 'UpdateStatus',
      variables: { orderId, status }
    })
    Alert.success(`Order status changed to "${UpdateStatus.status}"`)
    yield put({ type: types.UPDATE_ORDER_STATUS_SUCCESS })
  } catch (error) {
    Alert.error(setErrorMessage(error))
    yield put({ type: types.UPDATE_ORDER_STATUS_FAILURE })
  }
}

export function* selectVideo(action) {
  const { orderProductId, video, resolve, reject } = action.payload
  yield put({ type: types.SELECT_VIDEO, payload: video })

  try {
    const results = yield video.map((v) => call(mutate, {
      mutation: 'UploadPhoto',
      variables: {
        orderProductId,
        photo:v
      }
    }))
    const uploadedVideos = R.zipWith((a, b) => Object.assign(a, { material:b.data.UploadPhoto.photo }), video, results)
    yield put({ type: types.UPLOAD_VIDEO_SUCCESS, payload: { uploadedVideos, orderProductId } })
    Alert.success('Video successfully uploaded!')
    resolve(uploadedVideos)
  } catch (error) {
    Alert.error(setErrorMessage(error))
    reject(error)
    yield put({ type: types.UPLOAD_VIDEO_FAILURE })
  }
}

export function* selectDYIFloorPlan(action) {
  const { orderProductId, floorPlan, resolve, reject } = action.payload
  yield put({ type: types.SELECT_DYI_FLOOR_PLAN, payload: floorPlan })

  try {
    const results = yield floorPlan.map((plan) => call(mutate, {
      mutation: 'UploadPhoto',
      variables: {
        orderProductId,
        photo:plan
      }
    }))
    const uploadedPlans = R.zipWith((a, b) => Object.assign(a, { material:b.data.UploadPhoto.photo }), floorPlan, results)
    yield put({ type: types.UPLOAD_DYI_FLOOR_PLAN_SUCCESS, payload: { uploadedPlans, orderProductId } })
    Alert.success('DYI Floor plan successfully uploaded!')
    resolve(uploadedPlans)
  } catch (error) {
    Alert.error(setErrorMessage(error))
    reject(error)
    yield put({ type: types.UPLOAD_DYI_FLOOR_PLAN_FAILURE })
  }
}


export function* selectFloorPlan(action) {
  const { orderProductId, floorPlan, resolve, reject } = action.payload
  yield put({ type: types.SELECT_FLOOR_PLAN, payload: floorPlan })

  try {
    const results = yield floorPlan.map((plan) => call(mutate, {
      mutation: 'UploadPhoto',
      variables: {
        orderProductId,
        photo:plan
      }
    }))
    const uploadedPlans = R.zipWith((a, b) => Object.assign(a, { material:b.data.UploadPhoto.photo }), floorPlan, results)
    yield put({ type: types.UPLOAD_FLOOR_PLAN_SUCCESS, payload: { uploadedPlans, orderProductId } })
    Alert.success('Floor plan successfully uploaded!')
    resolve(uploadedPlans)
  } catch (error) {
    Alert.error(setErrorMessage(error))
    reject(error)
    yield put({ type: types.UPLOAD_FLOOR_PLAN_FAILURE })
  }
}

export function* uploadPhotos(action) {
  const { orderProductId, photos, resolve, reject } = action.payload
  try {
    const results = yield photos.map((photo) => call(mutate, {
      mutation: 'UploadPhoto',
      variables: {
        orderProductId,
        photo
      }
    }))
    const uploadedPhotos = R.zipWith((a, b) => Object.assign(a, { material:b.data.UploadPhoto.photo }), photos, results)
    yield put({ type: types.UPLOAD_PHOTOS_SUCCESS, payload: { uploadedPhotos, orderProductId } })
    Alert.success('Photos successfully uploaded!')
    resolve(uploadedPhotos)
  } catch (error) {
    Alert.error(setErrorMessage(error))
    reject(error)
    yield put({ type: types.UPLOAD_PHOTOS_FAILURE })
  }
}

export function removeSelectedPhoto(action) {
  const { id, resolve, reject } = action.payload
  try {
    resolve(id)
  } catch (error) {
    Alert.error(setErrorMessage(error))
    reject(error)
  }
}

export function* trySelectPhotos(action) {
  const { payload:{ files, quantity, resolve, reject } } = action
  const selectedPhotos = yield select(selectors.selectedPhotos)
  const length = files.length + ((selectedPhotos && selectedPhotos.length) || 0)
  const reasons    = []
  const realQuantity = Math.ceil(length / 3)
  if (length % 3 !== 0) {
    reasons.push('Amount of files should by divisible by 3.')
  }
  if (realQuantity.toString() !== quantity.toString()) {
    reasons.push(`The original order quantity is ${quantity}, but you only uploaded ${length} files. You will submit the order with a new quantity of ${realQuantity}.`)
  }
  if (reasons.length > 0) {
    yield put({ type: types.SHOW_MODAL, payload: { component: 'PhotoShootNotMatched', payload:{ files, reasons, resolve, reject } } })
  } else {
    yield put({ type: types.SELECT_PHOTOS, payload:files })
  }
}

export function* tryToggleTwilightPhoto(action) {
  const { payload:{ material, orderProductId } } = action
  yield put({ type: types.TOGGLE_TWILIGHT_PHOTO, payload:{ orderProductId, material } })
  const orderProduct = yield select(selectors.orderAttribute, orderProductId)
  if (orderProduct.quantity.toString() !== orderProduct.materials.length.toString()) {
    yield put({ type: types.SHOW_MODAL, payload: { component: 'VirtualTwilightAmountNotMatched', payload:{ reasons:[`You have selected ${orderProduct.materials.length} virtual twilight photos, but the agent only ordered ${orderProduct.quantity}. Is this correct?`] } } })
  }
}


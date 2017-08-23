import { call, put, select } from 'redux-saga/effects'
import Alert from 'utils/alert'
import client from 'services/client'
import types from 'constants/actionTypes'
import R from 'ramda'
import { setErrorMessage } from 'utils/helpers'
import * as ewarp from 'utils/ewarp/apiQueryGen'

export function* createOrder(action) {
  const { query, resolve, reject } = action.payload
  try {
    const result = yield call(client.createOrder, query)
    yield put({ type: types.EWARP_CREATE_ORDER_SUCCESS, payload: result })
    yield put({ type: types.EWARP_ADD_MATERIALS_FOR_BATCH_REQUEST, payload: { resolve, reject } })
    Alert.success('Order successfully created')
    resolve(result)
  } catch (error) {
    yield put({ type: types.EWARP_CREATE_ORDER_FAILURE, payload: error })
    Alert.error(setErrorMessage(error))
    reject(error)
  }
}

function* getMaterials(orderAttributeId) {
  const orderAttribute = yield select(
    (state) => ({
      orderAttr: R.find(R.propEq('id', orderAttributeId),
          state.orderUpload.order.order_attribute)
    }))
  return orderAttribute.materials
}

export function* addMaterialsForBatch(action) {
  const { resolve, reject } = action.payload
  try {
    const { readyForAddMaterials, orderReference, batches } = yield select(
      (state) => ({
        readyForAddMaterials: state.orderUpload.readyForAddMaterials,
        orderReference: state.orderUpload.orderReference,
        batches: state.orderUpload.batches
      }))
    if (readyForAddMaterials) {
      const queries = batches.map((batch) => ewarp.addMaterialsForBatch(
        orderReference,
        batch.batchId,
        getMaterials(batch.order_attribute)))
      const results = yield queries.map(query => call(client.addMaterialsForBatch, query))
      yield results.map((result) => put({ type: types.EWARP_ADD_MATERIALS_FOR_BATCH_SUCCESS, payload: result }))
    }
  } catch (error) {
    yield put({ type: types.EWARP_ADD_MATERIALS_FOR_BATCH_FAILURE, payload: error })
    Alert.error(setErrorMessage(error))
    reject()
  }
  Alert.success('Materials successfully added')
  resolve()
}

export function* batchReadyForProduction(action) {
  const { resolve, reject } = action.payload

  try {
    const { ready, batches } = yield select((state) => ({
      ready: state.eWarpAPI.materialsAdded,
      batches: state.orderUpload.batches
    }))
    if (ready) {
      const queries = batches.map((batch) => ewarp.batchReadyForProduction(batch.batchId))
      const results = yield queries.map(query => call(client.batchReadyForProduction, query))
      yield results.map((result) => put({ type: types.EWARP_BATCH_READY_FOR_PRODUCTION_SUCCESS, payload: result }))
    }
  } catch (error) {
    yield put({ type: types.EWARP_BATCH_READY_FOR_PRODUCTION_FAILURE })
    reject()
  }
  resolve()
}


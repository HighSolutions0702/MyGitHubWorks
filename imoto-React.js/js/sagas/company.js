import types from 'constants/actionTypes'
import Alert from 'utils/alert'
import { query } from 'apollo'
import { call, put } from 'redux-saga/effects'
import { setErrorMessage } from 'utils/helpers'

export function* companyBranches(action) {
  try {
    const { data, error } = yield call(query, {
      query: 'getCompanyBranches',
      parameters: {
        companyName: action.payload
      }
    })
    yield put({ type: types.GET_COMPANY_BRANCHES_SUCCESS, payload: data.company_branches })
  } catch (error) {
    Alert.error(setErrorMessage(error))
    yield put({ type: types.GET_CURRENT_ORDER_INFO_FAILURE })
  }
}

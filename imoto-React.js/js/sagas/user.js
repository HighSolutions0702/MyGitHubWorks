import { call, put } from 'redux-saga/effects'
import { mutate } from 'apollo'
import types from 'constants/actionTypes'
import { browserHistory } from 'react-router'
import Alert from 'utils/alert'
import { setErrorMessage } from 'utils/helpers'

export function* agentRegister(action) {
  const { values, resolve, reject } = action.payload
  try {
    if (values.companyId === undefined) {
      const response = yield call(mutate, {
        mutation: 'CreateCompany',
        variables: values
      })
      values.companyId = response.data.CreateCompany.company.id
    }
    const { data } = yield call(mutate, {
      mutation: 'CreateAgent',
      variables: { ...values }
    })
    yield put({ type: types.AGENT_REGISTRATION_SUCCESS, payload: { user: data.createCustomer } })
    yield put({ type: types.CLEAR_PERSONAL_PHOTO })
    browserHistory.push('/account')
    resolve()
  } catch (error) {
    Alert.error(setErrorMessage(error))
    reject()
    yield put({ type: types.AGENT_REGISTRATION_FAILURE })
  }
}

export function* homeOwnerRegister(action) {
  const { values, resolve, reject } = action.payload
  try {
    const { data } = yield call(mutate, {
      mutation: 'CreateHomeowner',
      variables: { ...values }
    })
    yield put({ type: types.HOMEOWNER_REGISTRATION_SUCCESS, payload: { user: data.createCustomer } })
    yield put({ type: types.CLEAR_PERSONAL_PHOTO })
    browserHistory.push('/account')
    resolve()
  } catch (error) {
    Alert.error(setErrorMessage(error))
    reject()
    yield put({ type: types.HOMEOWNER_REGISTRATION_FAILURE })
  }
}

export function* registrationCompanies(action) {
  const { values, resolve, reject } = action.payload
  try {
    const { data } = yield call(mutate, {
      mutation: 'CreateCustomer',
      variables: { ...values }
    })
    yield put({
      type: types.GET_REGISTERED_COMPANIES_SUCCESS,
      payload: { user: data.createCustomer }
    })
    resolve()
  } catch (error) {
    Alert.error(setErrorMessage(error))
    reject()
    yield put({ type: types.GET_REGISTERED_COMPANIES_FAILURE })
  }
}

export function* login(action) {
  const { values, resolve, reject } = action.payload
  try {
    const { data } = yield call(mutate, {
      mutation: 'SignInUser',
      variables: { ...values }
    })
    yield put({ type: types.USER_LOGIN_SUCCESS, payload: { user: data.SignInUser } })
    switch (data.SignInUser.user.role) {
      case 'Customer':
        browserHistory.push('/account')
        break
      case 'Photographer':
        browserHistory.push('/photographer')
        break
      default:
        break
    }
    resolve()
  } catch (error) {
    Alert.error(setErrorMessage(error))
    reject()
    yield put({ type: types.USER_LOGIN_FAILURE })
  }
}

export function* forgotPassword(action) {
  const { values, resolve, reject } = action.payload
  try {
    const { data } = yield call(mutate, {
      mutation: 'SendResetPasswordInstruction',
      variables: { ...values }
    })
    yield put({
      type: types.FORGOT_PASSWORD_SUCCESS,
      payload: { user: data.SendResetPasswordInstruction }
    })
    browserHistory.push('/')
    resolve()
  } catch (error) {
    Alert.error(setErrorMessage(error))
    reject()
    yield put({ type: types.FORGOT_PASSWORD_FAILURE })
  }
}

export function* resetPassword(action) {
  const { modifiedValues, resolve, reject } = action.payload
  try {
    const { data } = yield call(mutate, {
      mutation: 'ResetPassword',
      variables: { ...modifiedValues }
    })
    yield put({
      type: types.RESET_PASSWORD_SUCCESS,
      payload: { user: data.ResetPassword }
    })
    browserHistory.push('/login')
    resolve()
  } catch (error) {
    Alert.error(setErrorMessage(error))
    reject()
    yield put({ type: types.RESET_PASSWORD_FAILURE })
  }
}

export function* updatePhotographer(action) {
  const { values, resolve, reject } = action.payload
  try {
    yield call(mutate, {
      mutation: 'UpdatePhotographer',
      variables: { ...values }
    })
    Alert.success('User was successfully updated')
    yield put({ type: types.UPDATE_USER_SUCCESS })
    resolve()
  } catch (error) {
    Alert.error(setErrorMessage(error))
    reject()
    yield put({ type: types.UPDATE_USER_FAILURE })
  }
}

export function* updateCustomer(action) {
  const { values, resolve, reject } = action.payload
  try {
    yield call(mutate, {
      mutation: 'UpdateCustomer',
      variables: { ...values }
    })
    Alert.success('User was successfully updated')
    yield put({ type: types.UPDATE_USER_SUCCESS })
    resolve()
  } catch (error) {
    Alert.error(setErrorMessage(error))
    reject()
    yield put({ type: types.UPDATE_USER_FAILURE })
  }
}

export function* logout(action) {
  try {
    const { role } = action.payload
    switch (role) {
      case 'Customer':
        yield call(mutate, { mutation: 'SignOutCustomer' })
        break
      case 'Photographer':
        yield call(mutate, { mutation: 'SignOutPhotographer' })
        break
      default:
        break
    }

    yield put({ type: types.USER_LOGOUT_SUCCESS })
    browserHistory.push('/login')
  } catch (error) {
    yield put({ type: types.USER_LOGOUT_FAILURE })
    Alert.error(setErrorMessage(error))
  }
}

export function* addCreditCard(action) {
  const { values, resolve, reject } = action.payload
  try {
    const result = yield call(mutate, { mutation: 'CreateCreditCard', variables: { ...values } })
    yield put({ type: types.ADD_CREDIT_CARD_SUCCESS, payload: result.data.CreateCreditCard.credit_card })
    resolve()
  } catch (error) {
    yield put({ type: types.ADD_CREDIT_CARD_FAILURE })
    Alert.error(setErrorMessage(error))
    reject()
  }
}

export function* removeCreditCard(action) {
  const { values, resolve, reject } = action.payload
  try {
    const result = yield call(mutate, { mutation: 'DeleteCreditCard', variables: { ...values } })
    yield put({ type: types.REMOVE_CREDIT_CARD_SUCCESS, payload: result.data.DeleteCreditCard.credit_card })
    resolve()
  } catch (error) {
    yield put({ type: types.REMOVE_CREDIT_CARD_FAILURE })
    Alert.error(setErrorMessage(error))
    reject()
  }
}

import types from 'constants/actionTypes'
import { takeLatest } from 'redux-saga'
import * as user from 'sagas/user'
import * as placeOrder from 'sagas/placeOrder'
import * as uploadOrder from 'sagas/uploadOrder'
import * as eWarpAPI from 'sagas/eWarpAPI'
import * as company from 'sagas/company'

export default function* root() {
  yield [
    takeLatest(types.AGENT_REGISTRATION_REQUEST, user.agentRegister),
    takeLatest(types.GET_COMPANY_BRANCHES_REQUEST, company.companyBranches),
    takeLatest(types.HOMEOWNER_REGISTRATION_REQUEST, user.homeOwnerRegister),
    takeLatest(types.USER_LOGIN_REQUEST, user.login),
    takeLatest(types.FORGOT_PASSWORD_REQUEST, user.forgotPassword),
    takeLatest(types.RESET_PASSWORD_REQUEST, user.resetPassword),
    takeLatest(types.UPDATE_CUSTOMER_REQUEST, user.updateCustomer),
    takeLatest(types.UPDATE_PHOTOGRAPHER_REQUEST, user.updatePhotographer),
    takeLatest(types.USER_LOGOUT_REQUEST, user.logout),
    takeLatest(types.ADD_CREDIT_CARD_REQUEST, user.addCreditCard),
    takeLatest(types.REMOVE_CREDIT_CARD_REQUEST, user.removeCreditCard),
    takeLatest(types.GET_CURRENT_LOCATION, placeOrder.getCurrentLocation),
    takeLatest(types.CREATE_INITIAL_EMPTY_ORDER_REQUEST, placeOrder.createEmptyOrder),
    takeLatest(types.ZIP_CODE_VALIDATION_REQUEST, placeOrder.zipCodeValidation),
    takeLatest(types.ADD_DISCOUNT_CODE_REQUEST, placeOrder.addDiscountCode),
    takeLatest(types.UPDATE_LISTING_DETAILS_REQUEST, placeOrder.updateListingDetails),
    takeLatest(types.GET_CURRENT_ORDER_INFO_REQUEST, placeOrder.currentOrderInfo),
    takeLatest(types.GET_ORDER_PRODUCTS_REQUEST, placeOrder.orderProducts),
    takeLatest(types.SUBMIT_PRODUCT_LIST_REQUEST, placeOrder.submitProductList),
    takeLatest(types.GET_AVAILABLE_PHOTOGRAPHERS_REQUEST, placeOrder.photographersAvailability),
    takeLatest(types.GET_INITIAL_AVAILABLE_PHOTOGRAPHERS_REQUEST, placeOrder.initialPhotographersAvailability),
    takeLatest(types.GET_INITIAL_PRODUCTS_LIST_REQUEST, placeOrder.initialProductList),
    takeLatest(types.SAVE_ORDER_ON_SECOND_STEP, placeOrder.saveOrderOnSecondStep),
    takeLatest(types.SET_ORDER_PHOTOGRAPHERS_REQUEST, placeOrder.setOrderPhotographers),
    takeLatest(types.SET_PAYMENT_INFORMATION_REQUEST, placeOrder.setPaymentInformation),
    takeLatest(types.UPLOAD_PHOTOS_REQUEST, uploadOrder.uploadPhotos),
    takeLatest(types.TRY_SELECT_VIDEO, uploadOrder.selectVideo),
    takeLatest(types.TRY_SELECT_FLOOR_PLAN, uploadOrder.selectFloorPlan),
    takeLatest(types.TRY_SELECT_DYI_FLOOR_PLAN, uploadOrder.selectDYIFloorPlan),
    takeLatest(types.GET_ORDER_FOR_UPLOAD_REQUEST, uploadOrder.getOrder),
    takeLatest(types.EWARP_CREATE_ORDER_REQUEST, eWarpAPI.createOrder),
    takeLatest(types.EWARP_ADD_MATERIALS_FOR_BATCH_REQUEST, eWarpAPI.addMaterialsForBatch),
    takeLatest(types.EWARP_BATCH_READY_FOR_PRODUCTION_REQUEST, eWarpAPI.batchReadyForProduction),
    takeLatest(types.UPDATE_ORDER_STATUS_REQUEST, uploadOrder.updateOrderStatus),
    takeLatest(types.TRY_SELECT_PHOTOS, uploadOrder.trySelectPhotos),
    takeLatest(types.REMOVE_SELECTED_PHOTO, uploadOrder.removeSelectedPhoto),
    takeLatest(types.TRY_TOGGLE_TWILIGHT_PHOTO, uploadOrder.tryToggleTwilightPhoto)
  ]
}

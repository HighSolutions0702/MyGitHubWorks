import types from 'constants/actionTypes'
import R from 'ramda'

const initialState = {
  currentStep: 1,
  activeStep: 1,
  collapseStep: '',
  selectedProducts: [],
  orderSummary: [],
  availablePhotographers: [],
  chosenPhotographers: {},
  showFirstAvailablePhotographer: true
}

export default function placeOrder(state = initialState, action = {}) {
  const { type } = action
  const productFilter = (item) => item.id !== action.payload

  switch (type) {
    case types.RESET_PLACE_ORDER:
      return initialState
    case types.CHANGE_PLACE_ORDER_CURRENT_STEP:
      return R.merge(state, { currentStep: action.payload })
    case types.GET_CURRENT_ORDER_INFO_SUCCESS:
      return R.merge(state, {
        currentStep: +action.payload.order.current_step || 1,
        activeStep: +action.payload.order.active_step || 1,
        listingDetails: {
          address: action.payload.order.address,
          city: action.payload.order.city,
          numberOfBeds: action.payload.order.number_of_beds,
          numberOfBaths: action.payload.order.number_of_baths,
          squareFootage: action.payload.order.square_footage,
          zipCode: action.payload.order.zip_code
        },
        coupon: action.payload.order.coupon ? {
          discountType: action.payload.order.coupon.discount_type,
          discountAmount: +action.payload.order.coupon.discount_amount,
          minimumPurchase: +action.payload.order.coupon.minimum_purchase
        } : null
      })
    case types.COLLAPSE_ORDER_STEP:
      return R.merge(state, { collapseStep: action.payload })
    case types.CHANGE_PLACE_ORDER_ACTIVE_STEP:
      return R.merge(state, { activeStep: action.payload })
    case types.SET_ORDER_SUMMARY:
      return R.merge(state, { orderSummary: action.payload })
    case types.CHANGE_ORDER_DETAILS:
      return R.merge(state, action.payload)
    case types.ZIP_CODE_VALIDATION_SUCCESS:
      return R.merge(state, { listingDetails: action.payload })
    case types.ADD_DISCOUNT_CODE_SUCCESS:
      return R.merge(state, { coupon: {
        discountType: action.payload.ApplyDiscountCode.order.coupon.discount_type,
        discountAmount: +action.payload.ApplyDiscountCode.order.coupon.discount_amount,
        minimumPurchase: +action.payload.ApplyDiscountCode.order.coupon.minimum_purchase
      } })
    case types.CREATE_INITIAL_EMPTY_ORDER_SUCCESS:
      return R.merge(state, { id: action.payload.InitialEmptyOrder.order.id })
    case types.SET_PLACE_ORDER_ID:
      return R.merge(state, { id: action.payload })
    case types.REMOVE_PHOTOGRAPHER_FROM_ORDER:
      return R.merge(state, { chosenPhotographers: {} })
    case types.ADD_PHOTOGRAPHER_TO_ORDER:
      return R.merge(state, { chosenPhotographers: action.payload })
    case types.GET_INITIAL_PRODUCTS_LIST_SUCCESS:
      return R.merge(state, { initialProductList: action.payload.products_with_attributes })
    case types.GET_AVAILABLE_PHOTOGRAPHERS_SUCCESS:
      return R.merge(state, {
        availablePhotographers: action.payload.available_photographers,
        showFirstAvailablePhotographer: false,
        chosenPhotographers: {}
      })
    case types.GET_FIRST_AVAILABLE_PHOTOGRAPHER:
      return R.merge(state, {
        showFirstAvailablePhotographer: true,
        chosenPhotographers: {}
      })
    case types.GET_INITIAL_AVAILABLE_PHOTOGRAPHERS_SUCCESS:
      return R.merge(state, { availablePhotographers: action.payload.available_photographers })
    case types.GET_ORDER_PRODUCTS_SUCCESS:
      return R.merge(state, { selectedProducts: action.payload.order.products })
    case types.ADD_PRODUCT_TO_LIST:
      return R.merge(state, { selectedProducts: state.selectedProducts.concat(action.payload) })
    case types.REMOVE_PRODUCT_FROM_LIST:
      return R.merge(state, { selectedProducts: state.selectedProducts.filter(productFilter) })
    default:
      return state
  }
}

import R from 'ramda'

export const placeOrder = (state) => state.placeOrder

export const selectProductForm = (state) => state.form['order-select-products'].values

export const orderAttribute = (state, orderProductId) => R.find(R.propEq('id', orderProductId))(state.orderUpload.order.order_attributes)
export const selectedPhotos = (state) => state.orderUpload.selectedPhotos

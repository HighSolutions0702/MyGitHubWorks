import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import { connect } from 'react-redux'
import R from 'ramda'
import config from 'constants/config'
import * as normalize from 'utils/normalizeSchema'
import types from 'constants/actionTypes'
import Layout from 'components/shared/Layout'
import OrderSummary from './OrderSummary'
import DiscountCodeBlock from './DiscountCodeBlock'
import PaymentDetails from './PaymentDetails'
import SchedulePhotographer from './SchedulePhotographer'
import SelectProducts from './SelectProducts'
import ListingDetails from './ListingDetails'
import styles from './index.pcss'

class PlaceOrder extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    const orderId = (() => JSON.parse(localStorage.getItem(`${config.STORAGE_NAMESPACE}/orderId`)))()
    if (orderId && !R.isEmpty(orderId)) {
      dispatch({ type: types.GET_CURRENT_ORDER_INFO_REQUEST, payload: orderId })
      dispatch({ type: types.SET_PLACE_ORDER_ID, payload: +orderId })
    } else {
      dispatch({ type: types.CREATE_INITIAL_EMPTY_ORDER_REQUEST })
    }
  }

  render() {
    const { placeOrder, orderFromServer } = this.props
    const order = orderFromServer || null
    const voucherInfo = order ? {
      address            : order.address,
      secondAddress      : order.second_address,
      city               : order.city,
      state              : order.state,
      zipCode            : normalize.zipCode(order.zip_code),
      listingPrice       : normalize.currency(order.listing_price),
      squareFootage      : normalize.numberValue(order.square_footage),
      numberOfBeds       : normalize.numberWithDots(order.number_of_beds),
      numberOfBaths      : normalize.numberValue(order.number_of_baths),
      listingDescription : order.listing_description
    } : {}
    const listingDetails = placeOrder.listingDetails || voucherInfo

    return (
      <Layout>
        <div styleName="page">
          <div styleName="wrapper">
            <div styleName="main-content">
              <ListingDetails
                initialValues={voucherInfo}
              />
              { placeOrder.currentStep > 1 && <SelectProducts /> }
              { placeOrder.currentStep > 2 && <SchedulePhotographer /> }
              { placeOrder.currentStep > 3 && <PaymentDetails /> }
            </div>
            <div styleName="order-summary-block">
              <OrderSummary listingDetails={listingDetails} />
              <DiscountCodeBlock />
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

function select(state) {
  return {
    placeOrder: state.placeOrder,
    orderFromServer: state.orderFromServer
  }
}

export default connect(select)(cssModules(PlaceOrder,
  styles, { allowMultiple: true }))

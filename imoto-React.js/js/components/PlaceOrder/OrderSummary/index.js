import React, { Component } from 'react'
import { connect } from 'react-redux'
import cssModules from 'react-css-modules'
import R from 'ramda'
import config from 'constants/config'
import styles from './index.pcss'

class OrderSummary extends Component {

  countTotalCost(totalCost, percentDiscount, discountAmount) {
    let result
    if (percentDiscount) {
      result = totalCost - ((discountAmount / 100) * totalCost)
    } else {
      result = totalCost - discountAmount
    }
    return result > 0 ? result.toFixed(2) : 0
  }

  render() {
    const {
      order: {
        activeStep,
        coupon,
        orderSummary
      },
      listingDetails: {
        address,
        secondAddress,
        city,
        state,
        zipCode
      },
      customerLocation
    } = this.props
    const percentDiscount = coupon && (coupon.discountType === 'percentage')
    const location = customerLocation || {}
    const totalCost = orderSummary.length ?
      orderSummary.reduce((sum, item) => (sum + +item.price), 0) : 0
    const sufficientOrderCost = coupon && (totalCost >= coupon.minimumPurchase)

    return (
      <div styleName="order-summary-block">
        <div styleName="order-summary-header">
          Order Summary
        </div>
        <div styleName="map-block">
          <img
            styleName="map"
            src={
              `https://maps.googleapis.com/maps/api/staticmap?zoom=12&size=555x80&maptype=roadmap
              &markers=icon:http://staging-imoto.jetru.by/images/icons/map-marker.png|${location.lat},${location.lng}
              &key=${config.GOOGLE_KEY_API}`
            }
            alt="map"
          />
          <div styleName="location-info">
            {
              activeStep !== 1 ?
                <div>
                  <div styleName="location-title">
                    YOUR LOCATION
                  </div>
                  <div styleName="location-desc" >
                    { `${address} ${city}, ${zipCode}` }
                  </div>
                </div>
              :
                null
            }
          </div>
        </div>
        {
          orderSummary.length ?
            <div styleName="order-info-block">
              <table >
                <thead styleName="order-info-header">
                  <tr>
                    <th styleName="info-header-title">ITEM</th>
                    <th styleName="info-header-title">QTY</th>
                    <th styleName="info-header-title">PRICE</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    orderSummary.map((item, index) =>
                      <tr key={index} styleName="info-item">
                        <td styleName="item-name">
                          {item.name }
                        </td>
                        <td styleName="item-qty">
                          { item.qty }
                        </td>
                        <td styleName="item-price">
                          { `$${item.price}` }
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
              <div styleName="total-cost-block">
                {
                  !coupon || R.isEmpty(coupon) || !sufficientOrderCost ?
                    <span> TOTAL: {`$${totalCost}`}</span>
                  :
                    <span>
                      {`TOTAL: $${totalCost} - ${coupon.discountAmount} ${percentDiscount ?
                        '% ' : ''} = ${this.countTotalCost(totalCost, percentDiscount, coupon.discountAmount)}`}
                    </span>
                }
              </div>
            </div>
          : null
        }
      </div>
    )
  }
}

function select(state) {
  return {
    order: state.placeOrder,
    customerLocation: state.customerLocation.coordinates
  }
}

export default connect(select)(cssModules(OrderSummary, styles))

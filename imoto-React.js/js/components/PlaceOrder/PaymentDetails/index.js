import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import { connect } from 'react-redux'
import OrderTabHeader from 'components/PlaceOrder/OrderTabHeader'
import PaymentForm from './PaymentForm'
import styles from './index.pcss'

class PaymentDetails extends Component {
  render() {
    const { order: { activeStep } } = this.props
    return (
      <div>
        <OrderTabHeader tabStep={4} />
        { activeStep === 4 && <PaymentForm /> }
      </div>
    )
  }
}

function select(state) {
  return {
    order: state.placeOrder
  }
}

export default connect(select)(PaymentDetails)

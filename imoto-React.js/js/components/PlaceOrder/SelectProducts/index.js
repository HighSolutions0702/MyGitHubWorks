import React, { Component } from 'react'
import types from 'constants/actionTypes'
import cssModules from 'react-css-modules'
import { connect } from 'react-redux'
import OrderTabHeader from 'components/PlaceOrder/OrderTabHeader'
import styles from 'components/PlaceOrder/index.pcss'
import ProductList from './ProductList'

class SelectProducts extends Component {


  render() {
    const { order } = this.props
    return (
      <div styleName="content select-products-block">
        <OrderTabHeader tabStep={2} />
        {
          order.activeStep === 2 ?
            <ProductList
              styleName={order.collapseStep === 'select-products' && 'product-form-collapsed'}
            />
          :
            null
        }
      </div>
    )
  }
}

function select(state) {
  return {
    order: state.placeOrder
  }
}

export default connect(select)(cssModules(SelectProducts,
  styles, { allowMultiple: true }))

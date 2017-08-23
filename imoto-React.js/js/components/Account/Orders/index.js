import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { queries } from 'apollo'
import PlaceOrder from 'components/Account/Orders/PlaceOrder'
import OrdersHistory from 'components/Account/Orders/OrdersHistory'
import R from 'ramda'
import { connect } from 'react-redux'
import types from 'constants/actionTypes'

class Orders extends Component {
  componentWillReceiveProps(nextProps) {
    const { dispatch, loading } = this.props
    if (loading) {
      dispatch({
        type: types.SAVE_ORDER_HISTORY_DATA,
        payload: nextProps.currentOrders
      })
    }
  }

  render() {
    const {
      orders,
      dispatch,
      currentOrders,
      loading
    } = this.props

    if (loading) return null

    return (
      <div>
        {
          R.isEmpty(currentOrders) ?
            <PlaceOrder dispatch={dispatch} />
          :
            <OrdersHistory
              orders={orders}
              dispatch={dispatch}
            />
        }
      </div>
    )
  }
}

function select(state) {
  return {
    orders: state.orders.list
  }
}

export default compose(
  graphql(queries.getOrdersList, {
    props: ({ data: { customer_orders, loading } }) => ({
      loading,
      currentOrders: customer_orders
    })
  }),
  connect(select)
)(Orders)

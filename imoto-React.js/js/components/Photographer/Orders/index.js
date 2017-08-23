import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { queries } from 'apollo'
import { imagePath } from 'utils/helpers'
import cssModules from 'react-css-modules'
import PhotographerOrder from 'components/Photographer/Orders/Order'
import OrderDropDown from 'components/Photographer/Orders/Dropdown'
import styles from './index.pcss'

class PhotographerOrders extends Component {

  constructor(props) {
    super(props)
    this.state = { uploadStateFilter : false }
    this.handler = this.handler.bind(this)
  }


  handler(e, toogleState) {
    this.setState({
      ...this.state,
      uploadStateFilter : this.state.uploadStateFilter === toogleState ? false : toogleState
    })
  }

  render() {
    const { currentOrders } = this.props
    const uploadStateFilter = this.state.uploadStateFilter
    return (
      <div styleName="container">
        <div styleName="white-header">
          <h3>Orders</h3>
          <OrderDropDown handler={this.handler} currentFilter={uploadStateFilter} />
        </div>
        {currentOrders && currentOrders.map(
          (order) => (
            (!uploadStateFilter || uploadStateFilter === order.status) ?
              <PhotographerOrder
                order={order.id}
                name={order.customer.full_name}
                uploadState={order.status}
                location={`${order.zip_code} ${order.city} - ${order.address}`}
                products={order.order_attributes}
              /> : null
          )
        )
      }
      </div>
    )
  }
}

export default graphql(
  queries.getPhotographerOrders, {
    props: ({ data: { photographer_orders } }) => ({
      currentOrders: photographer_orders
    }),
    options: {
      forceFetch: true,
      ssr: false
    }
  })(cssModules(PhotographerOrders, styles))

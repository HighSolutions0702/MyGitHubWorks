import React, { Component } from 'react'
import OrderUpload from 'components/OrderUpload'

class OrderUploadPage extends Component {
  render() {
    return <OrderUpload order_id={this.props.params.order} />
  }
}

export default OrderUploadPage

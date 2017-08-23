import React, { Component } from 'react'
import Button from 'components/shared/Button'
import TwilightLine from 'components/OrderUpload/VirtualTwilight/TwilightLine'
import { connect } from 'react-redux'
import R from 'ramda'
import * as normalize from 'utils/normalizeSchema'
import cssModules from 'react-css-modules'
import styles from '../index.pcss'


class VirtualTwilight extends Component {
  render() {
    const { product, product:{ quantity }, photos } = this.props
    return (
      <div styleName="block">
        <div styleName="wrapper-head-container">
          <div styleName="button-left">
            <span styleName="name">{product.name} - {quantity} photos</span>
          </div>
          <div styleName="button-right">
            <span styleName="price-orange">{normalize.currency(product.price)}</span>
          </div>
        </div>
        <div styleName="block-content">

          {(R.splitEvery(3, photos).map((t) => (<TwilightLine photos={t} product={product} />)))}

          <div styleName="buttons-container">
            <div styleName="button-left">
              <Button
                size="xsmall"
                type="button"
                color="white-gray"
                styleName="upload-button"
              >
              BACK
            </Button>
            </div>
            <div styleName="button-right">
              <Button
                size="xsmall"
                type="button"
                color="white-orange2"
                styleName="upload-button"
              >
              CONTINUE
            </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
function select(state) {
  return {
    order: state.orderUpload && state.orderUpload.order,
    photos: state.orderUpload &&
    state.orderUpload.selectedPhotos ? state.orderUpload.selectedPhotos : []
  }
}

export default connect(select)(cssModules(VirtualTwilight, styles))

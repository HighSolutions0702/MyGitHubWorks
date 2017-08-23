import React, { Component } from 'react'
import Button from 'components/shared/Button'
import StagingLine from 'components/OrderUpload/VirtualStaging/StagingLine'
import { imagePath } from 'utils/helpers'
import { connect } from 'react-redux'
import R from 'ramda'
import * as normalize from 'utils/normalizeSchema'
import cssModules from 'react-css-modules'
import styles from '../index.pcss'


class VirtualStaging extends Component {
  render() {
    const { photos, product } = this.props
    return (
      <div styleName="block-staging">
        <div styleName="wrapper-head-container">
          <div styleName="button-left">
            <span styleName="name">{product.name}</span>
          </div>
          <div styleName="button-right">
            <span styleName="price-orange">{normalize.currency(product.price)}</span>
          </div>
        </div>
        <div styleName="block-content">
          {(R.splitEvery(5, photos).map((t) => (<StagingLine photos={t} product={product} />)))}
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

export default connect(select)(cssModules(VirtualStaging, styles))

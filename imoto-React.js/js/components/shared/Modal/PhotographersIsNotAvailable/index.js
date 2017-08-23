import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { imagePath } from 'utils/helpers'
import cssModules from 'react-css-modules'
import Button from 'components/shared/Button'
import types from 'constants/actionTypes'
import styles from './index.pcss'
import Base from '../Base.js'

class PhotograpersIsNotAvailable extends Component {
  constructor(props) {
    super(props)
    this.onCancel = this.onCancel.bind(this)
    this.handleSaveMyOrderClick = this.handleSaveMyOrderClick.bind(this)
  }

  onCancel() {
    const { dispatch } = this.props
    dispatch({ type: types.HIDE_MODAL })
  }

  handleSaveMyOrderClick() {
    const { dispatch } = this.props
    dispatch({ type: types.SAVE_ORDER_ON_SECOND_STEP })
  }

  render() {
    const { order } = this.props
    return (
      <Base
        exitButton
        onHide={this.onCancel}
      >
        <div styleName="attention-container">
          <div styleName="icon">
            <img src={imagePath('/icons/exclamation.svg')} alt="exclamation" />
          </div>
          <div styleName="attention-head">
            Sorry! We can not find photographers in your area according to your order parameters !
          </div>
          <div styleName="description">
            <div styleName="attention-description">
              Please contant us by phone + 1 000 0100000 to solve this issue
            </div>
            <div>
              Plese write down your order Id <span styleName="id">{order.id}</span>.
              You will need it during communication with customer support.
            </div>
          </div>
        </div>
        <div styleName="buttons-container">
          <Button
            color="white-gray"
            size="xxlarge"
            onClick={this.onCancel}
          >
            Back
          </Button>
          <Button
            color="orange"
            size="xxlarge"
            onClick={this.handleSaveMyOrderClick}
          >
            Save My Order
          </Button>
        </div>
      </Base>
    )
  }
}

function select(state) {
  return {
    order: state.placeOrder
  }
}

export default connect(select)(cssModules(PhotograpersIsNotAvailable, styles,
  { allowMultiple: true }))

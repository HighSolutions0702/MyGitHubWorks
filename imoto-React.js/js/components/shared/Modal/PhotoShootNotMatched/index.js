import React, { Component } from 'react'
import { connect } from 'react-redux'
import { imagePath } from 'utils/helpers'
import cssModules from 'react-css-modules'
import Button from 'components/shared/Button'
import types from 'constants/actionTypes'
import styles from './index.pcss'
import Base from '../Base.js'

class PhotoShootNotMatched extends Component {
  constructor(props) {
    super(props)
    this.onCancel = this.onCancel.bind(this)
    this.onContinue = this.onContinue.bind(this)
  }

  onCancel() {
    const { dispatch, reject } = this.props
    dispatch({ type: types.HIDE_MODAL })
    reject()
  }

  onContinue() {
    const { dispatch, files, resolve } = this.props
    dispatch({ type: types.SELECT_PHOTOS, payload:files })
    dispatch({ type: types.HIDE_MODAL })
    resolve()
  }

  render() {
    const { reasons } = this.props
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
            Warning
          </div>
          <div styleName="description">
            {reasons && reasons.map((reason) => (
              <div styleName="attention-description">{reason}</div>
            ))}
            <div styleName="attention-description">
              Would you like to continue?
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
            onClick={this.onContinue}
          >
            Continue
          </Button>
        </div>
      </Base>
    )
  }
}

function select(state) {
  return {}
}

export default connect(select)(cssModules(PhotoShootNotMatched, styles, { allowMultiple: true }))

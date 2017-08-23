import React, { Component } from 'react'
import { imagePath } from 'utils/helpers'
import { connect } from 'react-redux'
import R from 'ramda'
import types from 'constants/actionTypes'
import cssModules from 'react-css-modules'
import styles from '../../index.pcss'

class Photo extends Component {

  constructor() {
    super()
    this.toggleCheck = this.toggleCheck.bind(this)
  }

  toggleCheck() {
    const { dispatch, photo, product } = this.props

    dispatch({
      type: types.TRY_TOGGLE_TWILIGHT_PHOTO,
      payload: { material: photo.material.name, orderProductId: product.id }
    })

    this.setState({
      toggle:true
    })
  }

  render() {
    const { photo, product } = this.props
    const checked = photo.material && photo.material.name && product.materials &&
      R.contains(photo.material.name, product.materials)
    return (
      <div styleName="twilight-block">
        <div styleName="twilight-check-wrap">
          <span
            styleName={checked ? 'twilight-check' : 'twilight-uncheck'} onClick={this.toggleCheck}
          />
        </div>
        <div styleName="twilight-img-wrap">
          <img
            src={photo.preview} alt=""
            styleName="twilight-img"
          />
        </div>
        <div styleName="twilight-desc">
          <span styleName="twilight-title">
            {photo.name}
          </span>
          <div styleName="twilight-title-options" />
        </div>

      </div>
    )
  }
}
function select(state) {
  return {}
}
export default (connect(select))(cssModules(Photo, styles))


import React, { Component } from 'react'
import ReactSelect from 'react-select'
import { connect } from 'react-redux'
import R from 'ramda'
import types from 'constants/actionTypes'
import cssModules from 'react-css-modules'
import styles from '../../index.pcss'

class Photo extends Component {


  constructor() {
    super()
    this.toggleCheck = this.toggleCheck.bind(this)
    this.changeRoom = this.changeRoom.bind(this)
    this.state = { toggle:false, room:null, style:null }
  }

  changeRoom(room, name) {
    const { dispatch, product } = this.props
    dispatch({
      type: types.CHANGE_ROOM_STAGING_PHOTO,
      payload: { name, room, orderProductId: product.id }
    })
    this.setState({
      room
    })
  }

  changeStyle(style, name) {
    const { dispatch, product } = this.props
    dispatch({
      type: types.CHANGE_STYLE_STAGING_PHOTO,
      payload: { name, style, orderProductId: product.id }
    })
    this.setState({
      style
    })
  }

  toggleCheck() {
    const { dispatch, photo, product } = this.props
    dispatch({
      type: types.TOGGLE_STAGING_PHOTO,
      payload: { material: photo.material.name, orderProductId: product.id }
    })

    this.setState({
      toggle:!this.state.toggle,
      room:null,
      style:null
    })
  }

  render() {
    const { photo, product } = this.props
    const data = product && product.attribute_item && product.attribute_item.data && JSON.parse(product.attribute_item.data)
    const options = data.dependent_select
    const checked = photo.material && photo.material.name && product.materials &&
      R.find(R.propEq('name', photo.material.name), product.materials)
    return (
      <div styleName="staging-photo-wrap">
        <div styleName="staging-photo-block">
          <img
            src={photo.preview} alt=""
            styleName="staging-photo-img"
          />
          <span
            styleName={checked ? 'staging-photo-check' : 'staging-photo-uncheck'} onClick={this.toggleCheck}
          />
          <span
            styleName="staging-photo-title"
          >{photo.name}</span>
          {checked &&
          <div styleName="field-wrapper">
            <ReactSelect
              name={`staging-place-${photo.name}`}
              onChange={(v) => this.changeRoom(v && v.value, photo.name)}
              options={options}
              value={this.state.room}
            />

          </div>
          }
          {checked &&
            <div styleName="field-wrapper">
              <input
                name={`staging-style-${photo.name}`}
                onChange={(v) => this.changeStyle(v.target && v.target.value, photo.name)}
                value={this.state.style}
              />
            </div>
          }
        </div>
      </div>
    )
  }
}
function select(state) {
  return {}
}
export default connect(select)(cssModules(Photo, styles))

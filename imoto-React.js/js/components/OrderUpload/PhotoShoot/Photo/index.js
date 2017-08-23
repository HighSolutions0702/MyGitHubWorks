import React, { Component } from 'react'
import { connect } from 'react-redux'
import types from 'constants/actionTypes'
import { imagePath } from 'utils/helpers'
import { Line } from 'rc-progress'
import cssModules from 'react-css-modules'
import styles from '../../index.pcss'

class Photo extends Component {

  constructor(props) {
    super(props)
    this.onRemovePhoto = this.onRemovePhoto.bind(this)
  }

  onRemovePhoto() {
    const { dispatch, photo, product } = this.props
    new Promise((resolve, reject) => {
      dispatch({ type:types.REMOVE_SELECTED_PHOTO, payload:{ id:photo.id, orderProductId:product.id, resolve, reject } })
    }).then(() => {
      this.setState({
        update:true
      })
    }).catch(() => {})
  }

  render() {
    const { index, photo } = this.props
    return (

      <div styleName="photo-block">
        <div styleName="photo-img-wrap">
          <img
            src={photo.preview} alt=""
            styleName="photo-img"
          />
        </div>
        <div styleName="photo-desc">
          <div styleName="photo-title-line">
            <span styleName="photo-title">
              {photo.name}
            </span>
            <span styleName="photo-size">{Math.round(photo.size / 10000) / 100} MB</span>
          </div>
          <Line styleName="progress-bar" percent={photo.progress} trailWidth="4" strokeWidth="4" strokeColor={photo.progress < 100 ? '#F28A0C' : '#75B900'} trailColor="#DFA867" />
          <div styleName="progress-line">
            <div styleName="percent">{photo.progress}% done</div>
          </div>
        </div>
        <img
          onClick={this.onRemovePhoto}
          src={imagePath('icons/grey-cross.svg')} alt=""
          styleName="close-button"
        />
      </div>

    )
  }
}
function select(state) {
  return { photos: state.orderUpload.selectedPhotos }
}
export default connect(select)(cssModules(Photo, styles))

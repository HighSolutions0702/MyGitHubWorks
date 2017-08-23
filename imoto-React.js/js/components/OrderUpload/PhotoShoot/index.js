import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import Button from 'components/shared/Button'
import PhotoLine from 'components/OrderUpload/PhotoShoot/PhotoLine'
import R from 'ramda'
import types from 'constants/actionTypes'
import { connect } from 'react-redux'
import cssModules from 'react-css-modules'
import styles from '../index.pcss'

class PhotoShoot extends Component {

  constructor() {
    super()
    this.onDrop = this.onDrop.bind(this)
    this.uploadPhotos = this.uploadPhotos.bind(this)
    this.deleteAll = this.deleteAll.bind(this)
    this.state = { uploadSuccessful: false }
  }


  onDrop(files) {
    const { dispatch, product:{ quantity } } = this.props
    new Promise((resolve, reject) => {
      dispatch({
        type: types.TRY_SELECT_PHOTOS,
        payload: {
          files,
          quantity,
          resolve,
          reject
        }
      })
    }).then(() => { this.uploadPhotos() })
      .catch(() => {})
  }

  uploadPhotos() {
    new Promise((resolve, reject) => {
      this.props.dispatch({
        type: types.UPLOAD_PHOTOS_REQUEST,
        payload: {
          orderProductId: this.props.product.id,
          photos: this.props.photos,
          resolve,
          reject
        }
      })
    }).then(() => {
      this.setState({
        uploadSuccessful: true
      })
      this.props.onUploadEnd()
    }).catch(() => {})
  }

  deleteAll() {
    new Promise((resolve, reject) => {
      this.props.dispatch({
        type: types.DELETE_ALL_PHOTOS_REQUEST,
        payload: {
          resolve,
          reject
        }
      })
    }).then(() => {
      this.setState({
        deleteAllSuccessful: true
      })
    }).catch(() => {})
  }

  render() {
    const { photos, product, product:{ quantity } } = this.props
    const { uploadSuccessful } = this.state
    return (
      <div styleName="block">
        <div styleName="wrapper-head-container">
          <div styleName="button-left">
            <span styleName="name">{product.name} - {quantity} photos</span>
          </div>
          <div styleName="button-right">
            {/* {!uploadSuccessful && <Button*/}
            {/* size="xsmall"*/}
            {/* type="button"*/}
            {/* color={photos && photos.length > 1 ? 'orange' : 'white-gray'}*/}
            {/* disabled={!photos || photos.length < 1}*/}
            {/* onClick={this.uploadPhotos}*/}
            {/* styleName="upload-button"*/}
            {/* >*/}
            {/* Upload Image*/}
            {/* </Button>}*/}

            {photos && photos.length > 0 && <Dropzone
              onDrop={this.onDrop}
              styleName="upload-button"
            > <Button
              size="xsmall"
              type="button"
              color="orange"
              styleName="upload-button"
            >
              UPLOAD MORE
            </Button></Dropzone>}
            {photos && photos.length > 0 && <Button
              size="xsmall"
              type="button"
              color="white-gray"
              styleName="upload-button"
              onClick={this.deleteAll}
            >
              DELETE ALL
            </Button>}
          </div>
        </div>

        <div styleName="block-content">
          {
            R.isEmpty(photos) ? <Dropzone
              onDrop={this.onDrop}
              styleName="upload-area"
            >
              <div styleName="upload-txtblock">
                <p styleName="graytext">ADD IMAGE</p>
                <p styleName="smalltext">Add photos <span
                  styleName="link-text"
                >dragging them</span> here</p>
                <div><span styleName="sub-text">Or&nbsp;</span>
                  <Button
                    size="xsmall"
                    type="button"
                    color="orange"
                    styleName="upload-button"
                  >
                    UPLOAD HERE
                  </Button>
                </div>
              </div>
            </Dropzone>
              : (R.splitEvery(3, photos).map((t) => (<PhotoLine photos={t} product />)))

          }
        </div>
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
              disabled={!uploadSuccessful}
            >
              CONTINUE
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

function select(state) {
  return {
    photos: state.orderUpload &&
    state.orderUpload.selectedPhotos ? state.orderUpload.selectedPhotos : []
  }
}

export default connect(select)(cssModules(PhotoShoot, styles))

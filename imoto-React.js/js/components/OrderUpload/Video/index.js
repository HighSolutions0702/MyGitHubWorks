import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import Button from 'components/shared/Button'
import R from 'ramda'
import types from 'constants/actionTypes'
import { imagePath } from 'utils/helpers'
import { WithContext as ReactTags } from 'react-tag-input'
import { connect } from 'react-redux'
import { Line } from 'rc-progress'
import * as normalize from 'utils/normalizeSchema'
import cssModules from 'react-css-modules'
import styles from '../index.pcss'

class Video extends Component {
  constructor(props) {
    super(props)
    this.state = {
      features: (props.product.data
      && !R.isEmpty(props.product.data)
      && R.isArrayLike(props.product.data)
      && JSON.parse(props.product.data)
        .map((feature, id) => ({ id, text: feature }))) || [],
      ...props
    }
    this.changeAddress = this.changeAddress.bind(this)
    this.changeSquareFootage = this.changeSquareFootage.bind(this)
    this.changeBeds = this.changeBeds.bind(this)
    this.changeBaths = this.changeBaths.bind(this)
    this.changeListingPrice = this.changeListingPrice.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleAddition = this.handleAddition.bind(this)
    this.onEditVideoDetails = this.onEditVideoDetails.bind(this)
    this.onDrop = this.onDrop.bind(this)
    this.onRemovePhoto = this.onRemovePhoto.bind(this)
  }

  onRemovePhoto() {
    const { dispatch, videos, product } = this.props
    new Promise((resolve, reject) => {
      dispatch({ type:types.REMOVE_SELECTED_VIDEO, payload:{ id:videos[0].id, orderProductId:product.id, resolve, reject } })
    }).then(() => {
      this.setState({
        update:true
      })
    }).catch(() => {})
  }

  onDrop(files) {
    new Promise((resolve, reject) => {
      this.props.dispatch({
        type: types.TRY_SELECT_VIDEO,
        payload: {
          orderProductId:this.props.product.id,
          video:files,
          resolve,
          reject } })
    }).then(() => {
      this.setState({
        selectedVideo:true
      })
      this.props.onUploadEnd()
    })
  }


  onEditVideoDetails() {
    this.props.dispatch({
      type: types.EDIT_VIDEO_DETAILS,
      payload: {
        state: {
          address: this.state.address,
          beds: this.state.beds,
          baths: this.state.baths,
          squareFootage: this.state.squareFootage,
          listingPrice: this.state.listingPrice,
          features:this.state.features.map((f) => f.text)
        }
      }
    })
  }

  changeAddress(event) {
    this.setState(R.merge(this.state, { address: event.target.value }))
    this.onEditVideoDetails()
  }

  changeSquareFootage(event) {
    this.setState(R.merge(this.state, { squareFootage: event.target.value }))
    this.onEditVideoDetails()
  }

  changeBeds(event) {
    this.setState(R.merge(this.state, { beds: event.target.value }))
    this.onEditVideoDetails()
  }

  changeBaths(event) {
    this.setState(R.merge(this.state, { baths: event.target.value }))
    this.onEditVideoDetails()
  }

  changeListingPrice(event) {
    this.setState(R.merge(this.state, { listingPrice: event.target.value }))
    this.onEditVideoDetails()
  }

  handleDelete(i) {
    const features = this.state.features
    features.splice(i, 1)
    this.setState(R.merge(this.state, { features }))
    this.onEditVideoDetails()
  }

  handleAddition(feature) {
    const features = this.state.features
    features.push({
      id: features.length + 1,
      text: feature
    })
    this.setState(R.merge(this.state, { features }))
    this.onEditVideoDetails()
  }

  // uploadVideo() {
  //   new Promise((resolve, reject) => {
  //     this.props.dispatch({
  //       type: types.UPLOAD_VIDEO_REQUEST,
  //       payload: {
  //         orderProductId: this.props.product.id,
  //         video: this.props.video,
  //         resolve,
  //         reject
  //       }
  //     })
  //   }).then(() => {
  //     this.setState({
  //       videoUploaded:true
  //     })
  //   }).catch(() => {})
  //   this.onEditVideoDetails()
  // }

  render() {
    const { product, videos } = this.props
    const video = videos && R.isArrayLike(videos) && videos[0]
    return (
      <div styleName="block">
        <div styleName="wrapper-head-container">
          <span styleName="name">{product.name}</span>
          <div styleName="button-container">
            <span styleName="price-orange">{normalize.currency(product.price)}</span>
          </div>
        </div>
        <div styleName="block-content">
          {video ? (<div styleName="video-upload-area">
            <div styleName="photo-img-wrap">
              <video
                src={video.preview} alt=""
                styleName="photo-img"
              />
            </div>
            <div styleName="photo-desc">
              <div styleName="photo-title-line">
                <span styleName="photo-title">
                  {video.name}
                </span>
                <span styleName="photo-size">{Math.round(video.size / 10000) / 100} MB</span>
              </div>
              <Line styleName="progress-bar" percent={video.progress} trailWidth="4" strokeWidth="4" strokeColor={video.progress < 100 ? '#F28A0C' : '#75B900'} trailColor="#DFA867" />
              <div styleName="progress-line">
                <div styleName="percent">{video.progress}% done</div>
              </div>
            </div>
            <img
              onClick={this.onRemovePhoto}
              src={imagePath('icons/grey-cross.svg')} alt=""
              styleName="close-button"
            />
          </div>)
            : (<Dropzone
              onDrop={this.onDrop}
              styleName="video-upload-area"
              multiple={false}
            >
              <div styleName="video-upload-txtblock">
                <p styleName="graytext">ADD VIDEO</p>
                <p styleName="smalltext">Add video <span
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
            )
          }
          <div styleName="video-desc-wrap">
            <div styleName="video-desc-title">MAIN TITLE</div>
            <input
              type="text" styleName="video-desc-input"
              value={this.state.address}
              onChange={this.changeAddress}
            />
            <div styleName="video-fullwidth-desc">
              <div styleName="video-half-desc">
                <div styleName="video-desc-title">BEDS</div>
                <input
                  type="text" styleName="video-desc-input"
                  value={this.state.beds}
                  onChange={this.changeBeds}
                />
                <div styleName="video-desc-title">SQUARE FOOTAGE</div>
                <input
                  type="text" styleName="video-desc-input"
                  value={this.state.squareFootage}
                  onChange={this.changeSquareFootage}
                />
              </div>
              <div styleName="video-half-desc">
                <div styleName="video-desc-title">BATHS</div>
                <input
                  type="text" styleName="video-desc-input"
                  value={this.state.baths}
                  onChange={this.changeBaths}
                />
                <div styleName="video-desc-title">LISTING PRICE</div>
                <input
                  type="text" styleName="video-desc-input"
                  value={this.state.listingPrice}
                  onChange={this.changeListingPrice}
                />
              </div>
            </div>
            <div styleName="video-features-wrap">
              <div styleName="video-desc-title">EXTRA FEATURES</div>
              <ReactTags
                tags={this.state.features}
                handleDelete={this.handleDelete}
                handleAddition={this.handleAddition}
              />
            </div>
          </div>
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
    videos: state.orderUpload && state.orderUpload.selectedVideo
  }
}
export default connect(select)(cssModules(Video, styles))

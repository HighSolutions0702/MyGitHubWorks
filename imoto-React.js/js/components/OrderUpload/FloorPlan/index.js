import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import Button from 'components/shared/Button'
import R from 'ramda'
import types from 'constants/actionTypes'
import { imagePath } from 'utils/helpers'
import { connect } from 'react-redux'
import { Line } from 'rc-progress'
import * as normalize from 'utils/normalizeSchema'
import cssModules from 'react-css-modules'
import styles from '../index.pcss'

class FloorPlan extends Component {
  constructor(props) {
    super(props)
    this.onDrop = this.onDrop.bind(this)
    this.onRemovePhoto = this.onRemovePhoto.bind(this)
  }


  onRemovePhoto() {
    const { dispatch, floorPlans, product } = this.props
    new Promise((resolve, reject) => {
      dispatch({ type:types.REMOVE_SELECTED_FLOOR_PLAN, payload:{ id:floorPlans[0].id, orderProductId:product.id, resolve, reject } })
    }).then(() => {
      this.setState({
        update:true
      })
    }).catch(() => {})
  }

  onDrop(files) {
    new Promise((resolve, reject) => {
      this.props.dispatch({
        type: types.TRY_SELECT_FLOOR_PLAN,
        payload: {
          orderProductId:this.props.product.id,
          floorPlan:files,
          resolve,
          reject } })
    }).then(() => {
      this.setState({
        selectedFloorPlan:true
      })
      this.props.onUploadEnd()
    })
  }


  render() {
    const { product, floorPlans } = this.props
    const floorPlan = floorPlans && R.isArrayLike(floorPlans) && floorPlans[0]
    return (
      <div styleName="block">
        <div styleName="wrapper-head-container">
          <span styleName="name">{product.name}</span>
          <div styleName="button-container">
            <span styleName="price-orange">{normalize.currency(product.price)}</span>
          </div>
        </div>
        <div styleName="block-content">
          {floorPlan ? (<div styleName="upload-area">
            <div styleName="photo-img-wrap">
              <img
                src={floorPlan.preview} alt=""
                styleName="photo-img"
              />
            </div>
            <div styleName="photo-desc">
              <div styleName="photo-title-line">
                <span styleName="photo-title">
                  {floorPlan.name}
                </span>
                <span styleName="photo-size">{Math.round(floorPlan.size / 10000) / 100} MB</span>
              </div>
              <Line styleName="progress-bar" percent={floorPlan.progress} trailWidth="4" strokeWidth="4" strokeColor={floorPlan.progress < 100 ? '#F28A0C' : '#75B900'} trailColor="#DFA867" />
              <div styleName="progress-line">
                <div styleName="percent">{floorPlan.progress}% done</div>
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
              styleName="upload-area"
              multiple={false}
            >
              <div styleName="upload-txtblock">
                <p styleName="graytext">ADD FLOOR PLAN</p>
                <p styleName="smalltext">Add floor plan <span
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
    floorPlans: state.orderUpload && state.orderUpload.selectedFloorPlan
  }
}
export default connect(select)(cssModules(FloorPlan, styles))

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import cssModules from 'react-css-modules'
import { imagePath } from 'utils/helpers'
import Button from 'components/shared/Button'
import config from 'constants/config'
import GoogleMap from 'google-map-react'
import types from 'constants/actionTypes'
import styles from './index.pcss'
import Base from '../Base.js'

class MapContainer extends Component {
  constructor() {
    super()
    this.onCancel = this.onCancel.bind(this)
    this.handleConfirmClick = this.handleConfirmClick.bind(this)
  }
  onCancel() {
    const { dispatch } = this.props
    dispatch({ type: types.HIDE_MODAL })
  }
  handleConfirmClick() {
    const { dispatch } = this.props
    dispatch({ type: types.UPDATE_LISTING_DETAILS_REQUEST })
  }
  render() {
    const { customerLocation: { coordinates, fullAddress } } = this.props
    return (
      <Base
        exitButton
        onHide={this.onCancel}
      >
        <div styleName="wrapper">
          {
            coordinates ?
              <div>
                <div styleName="map-head">
                  Location Confirmation
                </div>
                <div styleName="description">
                  Please confirm that we are showing the accurate
                  location of your property. If the location is not correct,
                  please modify the address or contact our office at 1- 990-999-999.
                </div>
                <div styleName="google-map-container">
                  <GoogleMap
                    bootstrapURLKeys={{
                      key: config.GOOGLE_KEY_API
                    }}
                    center={coordinates}
                    zoom={15}
                  >
                    <div styleName="marker" lat={coordinates.lat} lng={coordinates.lng}>
                      <img src={imagePath('icons/marker.svg')} alt="marker" />
                      <span styleName="current-address">{fullAddress}</span>
                    </div>
                  </GoogleMap>
                </div>
              </div> :
              <div styleName="attention-container">
                <div styleName="icon">
                  <img src={imagePath('/icons/exclamation.svg')} alt="exclamation" />
                </div>
                <div styleName="attention-head">
                  Sorry!
                </div>
                <div styleName="description">
                  <div styleName="attention-description">
                    The address is not found on the map.
                    Enter another action or miss
                  </div>
                </div>
              </div>
          }
          <div styleName="toolbar">
            <a
              onClick={this.handleConfirmClick}
              styleName="skip"
            >
              Skip Confirmation
            </a>
            <div styleName="buttons">
              <div styleName="modify-button">
                <Button
                  color="white-gray"
                  size="xxlarge"
                  onClick={this.onCancel}
                >
                  MODIFY ADDRESS
              </Button>
              </div>
              <div>
                <Button
                  size="xxlarge"
                  onClick={this.handleConfirmClick}
                >
                  CONFIRM ADDRESS
              </Button>
              </div>
            </div>
          </div>
        </div>
      </Base>
    )
  }
}

function select(state) {
  return {
    customerLocation: state.customerLocation
  }
}

export default connect(select)(cssModules(MapContainer, styles,
  { allowMultiple: true }))

import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import config from 'constants/config'
import GoogleMap from 'google-map-react'
import styles from 'components/VirtualTour/MapContainer/index.pcss'
import R from 'ramda'
import { imagePath } from 'utils/helpers'

class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      block: true
    }
    this.unlockMap = this.unlockMap.bind(this)
  }

  unlockMap() {
    this.setState({
      block: false
    })
  }

  render() {
    const { center, zoom, order } = this.props
    return (
      <div styleName="wrapper">
        <div styleName="content">
          <div className="root">
            <div styleName="header" >
              <div>
                <img src={imagePath('icons/facebook-placeholder-for-locate-places-on-maps.svg')} alt="" />
              </div>
              <span>
                {order ? order.address.toUpperCase() : '5938 WATERCREST WAY'}
              </span>
            </div>
            <div styleName="description">
              {order ? R.join(', ', R.reject(R.isNil, [order.second_address, `${order.city} ${order.state}`, order.zip_code])) : 'Unit 58, New Orleans LA, 70125'}
            </div>
          </div>
          <div styleName="map">
            <GoogleMap
              bootstrapURLKeys={{
                key: config.GOOGLE_KEY_API
              }}
              defaultCenter={center}
              defaultZoom={zoom}
            />
            {this.state.block &&
              <div styleName="blockMap" onClick={this.unlockMap}>
                <div />
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default cssModules(MapContainer, styles)

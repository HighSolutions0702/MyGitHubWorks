import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from 'components/VirtualTour/PropertyDetails/index.pcss'
import { imagePath } from 'utils/helpers'
import Block from 'components/shared/Block'
import formatCurrency from 'format-currency'

class PropertyDetails extends Component {
  render() {
    const { order } = this.props

    return (
      <div styleName="wrapper">
        <div className="root-2">
          <div styleName="header">
            PROPERTY DETAILS
          </div>
          <div styleName="row">
            <div styleName="photo-gallery">
              <div>
                <img src={imagePath('house-1.png')} alt="" />
              </div>
              <div styleName="photos">
                <div styleName="photo">
                  <img src={imagePath('room-1.png')} alt="" />
                </div>
                <div styleName="photo">
                  <img src={imagePath('room-2.png')} alt="" />
                </div>
                <div styleName="photo">
                  <img src={imagePath('room-3.png')} alt="" />
                </div>
              </div>
            </div>
            <div styleName="description">
              <div styleName="head-section">
                {order ? order.address.toUpperCase() : '5938 WATERCREST WAY'}
              </div>
              <div styleName="description-section">
                { order ? order.listing_description : `Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Ut pretium pretium tempor.
                Ut eget imperdiet neque. In volutpat ante semper diam molestie,
                et aliquam erat laoreet.`}
              </div>
              <div styleName="blocks-section">
                <div styleName="two-blocks">

                  <div styleName="block">
                    <Block src={imagePath('icons/price.svg')} description={order ? `${formatCurrency(order.listing_price, { format: '%s%v', symbol: '$' }).replace(/\.00/, '')}` : '$465,000'} header={'Listing Price'} />
                  </div>
                  <div styleName="block">
                    <Block src={imagePath('icons/cube-with-arrows.svg')} description={order ? `${formatCurrency(order.square_footage).replace(/\.00/, '')}` : '2,750'} header={'Square Footage'} />
                  </div>
                </div>
                <div styleName="two-blocks">
                  <div styleName="block">
                    <Block src={imagePath('icons/Beds.svg')} description={order ? +parseFloat(order.number_of_beds).toFixed(2) : '4'} header={'Beds'} />
                  </div>
                  <div styleName="block">
                    <Block src={imagePath('icons/shower.svg')} description={order ? +parseFloat(order.number_of_baths).toFixed(2) : '3.5'} header={'Baths'} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default cssModules(PropertyDetails, styles)

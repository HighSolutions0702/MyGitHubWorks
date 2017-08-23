import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from 'components/Home/PlaceOrder/index.pcss'
import PlaceOrderButtonContainer from 'components/shared/PlaceOrderButtonContainer'
import { imagePath } from 'utils/helpers'

class PlaceOrder extends Component {
  render() {
    return (
      <div styleName="wrapper">
        <img src={imagePath('bg-5.png')} alt="" />
        <div className="root" styleName="content">
          <div styleName="header">
            <div
              data-aos="fade-up"
              data-aos-delay="700"
            >
              Place for Our Order
            </div>
          </div>
          <div styleName="description">
            <div
              data-aos="fade-up"
              data-aos-delay="800"
            >
              Make your listing stand out from the crowd by
              purchasing one of IMOTOs professional solutions
            </div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="900"
          >
            <PlaceOrderButtonContainer />
          </div>
          <div styleName="background-header">
            <div
              data-aos="fade"
              data-aos-delay="1000"
            >
              Place Order
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default cssModules(PlaceOrder, styles)

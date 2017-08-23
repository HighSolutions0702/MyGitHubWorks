import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from 'components/Home/MobileApp/index.pcss'
import { imagePath } from 'utils/helpers'

class MobileApp extends Component {
  render() {
    return (
      <div styleName="wrapper">
        <div styleName="root">
          <div styleName="apps-container">
            <div
              styleName="header-wrapper"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div styleName="header">
                <div >
                  IMOTO Mobile App
                </div>
                <div styleName="description">
                  Download the mobile app take
                  your orders on the road
                </div>
              </div>
            </div>
            <div styleName="buttons-wrapper">
              <div
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <a styleName="app-butt">
                  <img alt="App Store" src={imagePath('appstore.svg')} />
                </a>
              </div>
              <div
                data-aos="fade-up"
                data-aos-delay="900"
              >
                <a>
                  <img alt="Get it on Google Play" src={imagePath('googleplay.png')} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          styleName="mobile-img"
          data-aos="fade"
          data-aos-offset="300"
        >
          <img src={imagePath('mobile.png')} alt="logo" />
        </div>
      </div>
    )
  }
}

export default cssModules(MobileApp, styles)

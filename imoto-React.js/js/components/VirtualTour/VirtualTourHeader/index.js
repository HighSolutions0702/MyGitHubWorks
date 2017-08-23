import React, { Component } from 'react'
import Slider from 'react-slick'
import cssModules from 'react-css-modules'
import { imagePath, virtualTourScroll } from 'utils/helpers'
import Scroll, { Link } from 'react-scroll'
import { hashHistory } from 'react-router'
import R from 'ramda'
import styles from './index.pcss'

const sliderSettings = {
  dotsClass: 'virtual-dots',
  dots: false,
  arrows: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  autoplaySpeed: 3000,
  autoplay: true,
  draggable: false,
  ref: 'slider',
  adaptiveHeight: true,
  verticalSwiping: false,
  swipe: false
}

class VirtualTourHeader extends Component {
  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
  }
  handleScroll(blockName) {
    virtualTourScroll(blockName)
    hashHistory.push(blockName)
  }
  render() {
    const { order } = this.props

    return (
      <div styleName="main">
        <Slider {...sliderSettings}>
          <div styleName="slide-wrapper">
            <img src={imagePath('bg-4.png')} alt="" />
          </div>
          <div styleName="slide-wrapper">
            <img src={imagePath('bg-5.png')} alt="" />
          </div>
          <div styleName="slide-wrapper">
            <img src={imagePath('about-bg.png')} alt="" />
          </div>
        </Slider>
        <div styleName="wrapper">
          <div className="root">
            <div styleName="content">
              <div styleName="logo">
                <img src={imagePath('logo/imoto-white-2.svg')} alt="" />
              </div>
              <div>
                <div styleName="header" >
                  {order ? order.address.toUpperCase() : '5938 WATERCREST WAY'}
                </div>
                <div styleName="description">
                  {order ? R.join(', ', R.reject(R.isNil, [order.second_address, `${order.city} ${order.state}`, order.zip_code])) : 'Unit 58, New Orleans LA, 70125'}
                </div>
              </div>
              <div
                styleName="scroll"
                onClick={() => this.handleScroll('virtualtour-photo')}
              >
                <div styleName="scroll-name">MORE PHOTOS</div>
                <div styleName="arrows">
                  <div styleName="first-arrow">
                    <img src={imagePath('arrows/arrow-down-white.svg')} alt="" />
                  </div>
                  <div styleName="second-arrow">
                    <img src={imagePath('arrows/arrow-down-white.svg')} alt="" />
                  </div>
                  <div styleName="third-arrow">
                    <img src={imagePath('arrows/arrow-down-white.svg')} alt="" />
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

export default cssModules(VirtualTourHeader, styles)

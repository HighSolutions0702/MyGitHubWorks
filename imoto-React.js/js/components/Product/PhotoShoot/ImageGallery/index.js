import React, { Component } from 'react'
import Slider from 'react-slick'
import cssModules from 'react-css-modules'
import styles from 'components/Product/PhotoShoot/ImageGallery/index.pcss'

const sliderSettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 1500,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  autoplaySpeed: 5000,
  autoplay: true,
  draggable: false,
  ref: 'slider'
}

class ImageGallery extends Component {
  constructor(props) {
    super(props)
    this.handleForwardClick = this.handleForwardClick.bind(this)
    this.handleBackClick = this.handleBackClick.bind(this)
  }
  handleBackClick() {
    this.refs.slider.slickPrev()
  }
  handleForwardClick() {
    this.refs.slider.slickNext()
  }
  render() {
    const { images } = this.props

    return (
      <div styleName="main">
        <Slider {...sliderSettings}>
          {
            images.map((src, index) =>
              <div key={index} styleName="slide-wrapper">
                <img src={src} alt="" />
              </div>
            )
          }
        </Slider>
        <div styleName="arrows-container">
          <div styleName="arrow-left" onClick={this.handleBackClick}>
            <img src="/images/arrows/arrow-left-gray.svg" alt="arrow" />
          </div>
          <div styleName="arrow-right" onClick={this.handleForwardClick}>
            <img src="/images/arrows/arrow-right-gray.svg" alt="arrow" />
          </div>
        </div>
      </div>
    )
  }
}

export default cssModules(ImageGallery, styles)

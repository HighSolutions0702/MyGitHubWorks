import React, { Component } from 'react'
import Slider from 'react-slick'
import PlaceOrderButtonContainer from 'components/shared/PlaceOrderButtonContainer'
import { Link } from 'react-router'
import { imagePath } from 'utils/helpers'
import cssModules from 'react-css-modules'
import styles from 'components/Home/SliderWrapper/index.pcss'

const sliderSettings = {
  dotsClass: 'dots',
  dots: true,
  arrows: false,
  infinite: true,
  speed: 1500,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade: true,
  autoplaySpeed: 5000,
  autoplay: true,
  draggable: false,
  ref: 'slider',
  adaptiveHeight: false,
  verticalSwiping: false,
  swipe: false
}

class SliderWrapper extends Component {
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
    return (
      <div styleName="main">
        <div data-aos="background">
          <div data-aos="logo">
            <div data-aos="fade">
              <div data-aos="oval" />
            </div>
            <div data-aos="circle-container">
              <div data-aos="circle" />
            </div>
          </div>
        </div>
        <div data-aos="anim" />
        <Slider {...sliderSettings}>
          <div styleName="slide-wrapper">
            <img src={imagePath('bg-4.png')} alt="" />
            <div styleName="slide-info">
              <div styleName="header">
                <div
                  data-aos="fade-up"
                  data-aos-delay="3300"
                >
                  Floor Plans Photography
                </div>
              </div>
              <div styleName="description">
                <div
                  data-aos="fade-up"
                  data-aos-delay="3600"
                >
                  Give potential buyers an understanding of your
                  listsings layout, before they ever enter the home!
                </div>
              </div>
              <Link
                to="/login"
                data-aos="fade-up"
                data-aos-delay="3900"
              >
                { /* temporary */ }
                <PlaceOrderButtonContainer shadow />
              </Link>
            </div>
          </div>
          <div styleName="slide-wrapper">
            <img src={imagePath('bg-5.png')} alt="" />
            <div styleName="slide-info">
              <div styleName="header" >
                Vestibulum sed nulla metus
              </div>
              <div styleName="description">
                Nulla pellentesque ac dui et fringilla.
                Praesent bibendum et mauris sed malesuada.
              </div>
              <Link to="/login">
                { /* temporary */ }
                <PlaceOrderButtonContainer shadow />
              </Link>
            </div>
          </div>
        </Slider>
        <div styleName="arrows-container" data-aos="fade">
          <div styleName="arrow-left" onClick={this.handleBackClick}>
            <img src={imagePath('arrows/arrow-left.svg')} alt="arrow" />
          </div>
          <div styleName="arrow-right" onClick={this.handleForwardClick}>
            <img src={imagePath('arrows/arrow-right.svg')} alt="arrow" />
          </div>
        </div>
      </div>
    )
  }
}

export default cssModules(SliderWrapper, styles)

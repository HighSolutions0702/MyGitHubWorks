import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from 'components/VirtualTour/FloorPlans/index.pcss'
import { imagePath } from 'utils/helpers'
import Block from 'components/shared/Block'

class FloorPlans extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 0,
      showBox: false
    }
    this.handleActive = this.handleActive.bind(this)
    this.toggleBox = this.toggleBox.bind(this)
  }
  handleActive(active) {
    this.setState({
      active
    })
  }
  toggleBox() {
    this.setState({
      showBox: !this.state.showBox
    })
  }
  render() {
    const { images, order } = this.props
    return (
      <div styleName="wrapper">
        <div className="root-2">
          <div styleName="header">
            FLOOR PLANS
          </div>
          <div styleName="row">
            <div styleName="floor-plan">
              <div onClick={this.toggleBox} styleName="zoomBox">
                <img src={images[this.state.active].src} alt="" />
                <div styleName="overlay">
                  <img src={imagePath('zoom-white.png')} role="presentation" />
                </div>
              </div>
            </div>
            <div styleName="description">
              <div styleName="head-section">
                {order ? order.address.toUpperCase() : '5938 WATERCREST WAY'}
              </div>
              <div>
                <ul styleName="tabSelected">
                  {images.map((image, key) =>
                    <li key={key}>
                      <a onClick={() => { this.handleActive(key) }}>
                        <img src={image.src} alt={image.title} />
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {this.state.showBox === true &&
          <div styleName="box">
            <div styleName="overlay" onClick={this.toggleBox} />
            <img styleName="close" src={imagePath('icons/close-white.png')} role="presentation" onClick={this.toggleBox} />
            <img src={images[this.state.active].src} role="presentation" />
            {this.state.active > 0 &&
              <button styleName="prev-button" onClick={() => { this.handleActive(this.state.active - 1) }}><img src={imagePath('left-arrow.svg')} role="presentation" /></button>
            }
            {this.state.active < (images.length - 1) &&
              <button styleName="next-button" onClick={() => { this.handleActive(this.state.active + 1) }}><img src={imagePath('right-arrow.svg')} role="presentation" /></button>
            }
          </div>
        }
      </div>
    )
  }
}

export default cssModules(FloorPlans, styles)

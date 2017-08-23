import React, { Component } from 'react'
import { productPageScroll } from 'utils/helpers'
import { hashHistory } from 'react-router'
import cssModules from 'react-css-modules'
import styles from './index.pcss'


class NavPanel extends Component {
  constructor(props) {
    super(props)
    this.handleElemClick = this.handleElemClick.bind(this)
  }

  handleElemClick(blockName) {
    productPageScroll(blockName)
    hashHistory.push(blockName)
  }

  render() {
    return (
      <div styleName="sub-header-wrapper">
        <div styleName="sub-header">
          <div
            styleName="sub-header-elem"
            onClick={() => this.handleElemClick('photos')}
          >
            PHOTOS
          </div>
          <div
            styleName="sub-header-elem"
            onClick={() => this.handleElemClick('videos')}
          >
            VIDEOS
          </div>
          <div
            styleName="sub-header-elem"
            onClick={() => this.handleElemClick('floor-plan')}
          >
            FLOOR PLAN
          </div>
          <div
            styleName="sub-header-elem"
            onClick={() => this.handleElemClick('3d-showcase')}
          >
            3D SHOWCASE
          </div>
          <div
            styleName="sub-header-elem"
            onClick={() => this.handleElemClick('add-ons')}
          >
            ADD ONS
          </div>
        </div>
      </div>
    )
  }
}

export default cssModules(NavPanel, styles)

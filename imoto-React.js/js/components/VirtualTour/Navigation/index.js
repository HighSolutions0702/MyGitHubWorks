import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import { hashHistory } from 'react-router'
import styles from 'components/VirtualTour/Navigation/index.pcss'
import { imagePath, virtualTourScroll } from 'utils/helpers'
import Scroll, { Link } from 'react-scroll'

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.handleElemClick = this.handleElemClick.bind(this)
  }
  handleElemClick(blockName) {
    virtualTourScroll(blockName)
    hashHistory.push(blockName)
  }

  render() {
    return (
      <div className="wrapper virtualtour-nav" style={this.props.style}>
        <div className="root">
          <div className="content">
            <Link
              activeClass="active"
              to="virtualtour-details"
              spy
              smooth
              offset={-100}
              duration={500}
              className="header"
              onClick={() => this.handleElemClick('virtualtour-details')}
            >
              <span title="PROPERTY DETAILS">
                          PROPERTY DETAILS
                        </span>
              <div className="rectangle" />
            </Link>
            <Link
              activeClass="active"
              to="virtualtour-photo"
              spy
              smooth
              offset={-100}
              duration={500}
              className="header"
              onClick={() => this.handleElemClick('virtualtour-photo')}
            >
              <span title="PHOTO SHOOT">
                          PHOTO SHOOT
                        </span>
              <div className="rectangle" />
            </Link>
            <Link
              activeClass="active"
              to="virtualtour-plan"
              spy
              smooth
              offset={-100}
              duration={500}
              className="header"
              onClick={() => this.handleElemClick('virtualtour-plan')}
            >
              <span title="FLOOR PLANS">
                          FLOOR PLANS
                        </span>
              <div className="rectangle" />
            </Link>
            <Link
              activeClass="active"
              to="virtualtour-video"
              spy
              smooth
              offset={-100}
              duration={500}
              title="VIDEO"
              className="header"
              onClick={() => this.handleElemClick('virtualtour-video')}
            >
              <span title="VIDEO">
                          VIDEO
                        </span>
              <div className="rectangle" />
            </Link>
            <Link
              activeClass="active"
              to="virtualtour-map"
              spy
              smooth
              offset={-100}
              duration={500}
              className="header"
              onClick={() => this.handleElemClick('virtualtour-map')}
            >
              <span title="MAP">
                          MAP
                        </span>
              <div className="rectangle" />
            </Link>
            <Link
              activeClass="active"
              to="virtualtour-agent"
              spy
              smooth
              offset={-100}
              duration={500}
              className="header"
              onClick={() => this.handleElemClick('virtualtour-agent')}
            >
              <span title="AGENT INFO">
                          AGENT INFO
                        </span>
              <div className="rectangle" />
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default cssModules(Navigation, styles)

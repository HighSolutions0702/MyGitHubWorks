import React, { Component } from 'react'
import { connect } from 'react-redux'
import cssModules from 'react-css-modules'
import styles from 'components/shared/Header/DropDownSubMenu/index.pcss'
import Button from 'components/shared/Button'
import { imagePath, productPageScroll } from 'utils/helpers'
import { hashHistory, browserHistory } from 'react-router'


class DropDownSubMenu extends Component {
  constructor(props) {
    super(props)
    this.handleLearnMoreClick = this.handleLearnMoreClick.bind(this)
  }
  handleLearnMoreClick(blockName) {
    const { currentRoute } = this.props
    if (currentRoute === '/product') {
      hashHistory.push(blockName)
      productPageScroll(blockName)
    } else {
      browserHistory.push(`/product#/${blockName}`)
    }
  }
  render() {
    const { items } = this.props
    return (
      <div styleName="main">
        <div styleName="sub-menu-container">
          {
            items.map((item, index) =>
              <div styleName="item-container" key={index}>
                <div styleName="icon-section">
                  <img src={imagePath(item.icon)} alt="" />
                </div>
                <div styleName="header-section">
                  <span>
                    {item.header}
                  </span>
                </div>
                <div styleName="description-section">
                  <span>
                    {item.description}
                  </span>
                </div>
                <div styleName="button-non-hover">
                  <Button
                    size="xxsmall"
                    type="submit"
                    color="white-orange2"
                  >
                    LEARN MORE
                  </Button>
                </div>
                <div styleName="button-on-hover">
                  <Button
                    size="xxsmall"
                    type="submit"
                    color="orange-white"
                    onClick={() => this.handleLearnMoreClick(item.name)}
                  >
                    LEARN MORE
                  </Button>
                </div>
              </div>
            )
          }
        </div>
        <div styleName="line" />
        <div styleName="contact-container">
          <div>
            <img src={imagePath('icons/phone-device.svg')} alt="" />
          </div>
          <div styleName="contact-info">
            <span>
              Have a Question or Need Assistance? Contact Us:
              <span styleName="phone-number">866-578-3324</span>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

function select(state) {
  return {
    currentRoute: state.routing.locationBeforeTransitions.pathname
  }
}

export default connect(select)(cssModules(DropDownSubMenu, styles))

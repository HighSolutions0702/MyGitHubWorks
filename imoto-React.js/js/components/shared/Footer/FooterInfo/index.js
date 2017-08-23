import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import { Link } from 'react-router'
import styles from 'components/shared/Footer/FooterInfo/index.pcss'
import { imagePath } from 'utils/helpers'

class FooterInfo extends Component {
  render() {
    return (
      <div styleName="wrapper">
        <div styleName="main">
          <div styleName="logo">
            <img src={imagePath('logo/logo.svg')} alt="logo" />
          </div>
          <div styleName="section">
            <span styleName="header">
              IMOTO Photography 2016
            </span>
            <a href="mailto:contact@imotophoto.com" styleName="email">
              contact@imotophoto.com
            </a>
            <a href="tel:18883168897" styleName="phone">
              1-888-316-8897
            </a>
          </div>
          <div styleName="section">
            <span styleName="header">
              ABOUT
            </span>
            <span>
              Lorem ipsum dolor sit amet, consectetur
              adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore aliqua.
            </span>
          </div>
          <div styleName="section">
            <span styleName="header">
              FOLLOW US
            </span>
            <div styleName="icons-wrapper">
              <Link>
                <img src={imagePath('social-media/twitter.svg')} alt="twitter" styleName="icon" />
              </Link>
              <Link>
                <img src={imagePath('social-media/facebook.svg')} alt="facebook" styleName="icon" />
              </Link>
              <Link>
                <img src={imagePath('social-media/google.svg')} alt="google" styleName="icon" />
              </Link>
              <Link>
                <img src={imagePath('social-media/tumblr.svg')} alt="tumblr" styleName="icon" />
              </Link>
              <Link>
                <img src={imagePath('social-media/pinterest.svg')} alt="pinterest" styleName="icon" />
              </Link>
              <Link>
                <img src={imagePath('social-media/linkedin.svg')} alt="linkedin" styleName="icon" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default cssModules(FooterInfo, styles)

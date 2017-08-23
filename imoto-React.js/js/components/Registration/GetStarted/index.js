import React, { Component } from 'react'
import { Link } from 'react-router'
import cssModules from 'react-css-modules'
import { imagePath } from 'utils/helpers'
import Button from 'components/shared/Button'
import styles from './index.pcss'

class Getstarted extends Component {
  render() {
    return (
      <div styleName="main">
        <div styleName="block-container">
          <div styleName="description-container">
            <div>
              <img src={imagePath('icons/card.svg')} alt="card" />
            </div>
            <div styleName="info">
              <span styleName="block-title">
                Real Estate Agent
              </span>
              <span styleName="block-description">
                Lorem Ipsum is simply dummy text of
                the printing and typesetting industry.
                Lorem Ipsum has been the industrys
                standard dummy text ever since the
                1500s, when an unknown printer took
                a galley of type and scrambled it
                to make a type specimen book.
              </span>
            </div>
          </div>
          <div styleName="button-container">
            <Link to={'/registration-agent'}>
              <Button size="xlarge">
                GET STARTED
              </Button>
            </Link>
          </div>
        </div>
        <div styleName="block-container">
          <div styleName="description-container">
            <div>
              <img src={imagePath('icons/keys.svg')} alt="card" />
            </div>
            <div styleName="info">
              <span styleName="block-title">
                Private Homeowner
              </span>
              <span styleName="block-description">
                Lorem Ipsum is simply dummy text of
                the printing and typesetting industry.
                Lorem Ipsum has been the industrys
                standard dummy text ever since the
                1500s, when an unknown printer took
                a galley of type and scrambled it
                to make a type specimen book.
              </span>
            </div>
          </div>
          <div styleName="button-container">
            <Link to={'/registration-homeowner'}>
              <Button size="xlarge">
              GET STARTED
            </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default cssModules(Getstarted, styles)

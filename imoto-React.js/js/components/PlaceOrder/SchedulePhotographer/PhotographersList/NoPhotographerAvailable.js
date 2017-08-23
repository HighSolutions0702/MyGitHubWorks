import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import { imagePath } from 'utils/helpers'
import styles from './index.pcss'

class NoPhotographerAvailable extends Component {

  render() {
    return (
      <div styleName="block-wrapper">
        <div styleName="block-image">
          <img
            role="presentation"
            src={imagePath('/icons/exclamation.svg')}
          />
        </div>
        <div styleName="block-title">
          Sorry !
        </div>
        <div styleName="block-description">
          No photographer is available for the desired date and time.
          Please try a different Date & Time
        </div>
      </div>
    )
  }
}

export default cssModules(NoPhotographerAvailable,
  styles, { allowMultiple: true })

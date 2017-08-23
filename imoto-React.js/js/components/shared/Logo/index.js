import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from 'components/shared/Logo/index.pcss'
import { imagePath } from 'utils/helpers'

class Logo extends Component {
  render() {
    return (
      <div styleName="wrapper">
        <img src={imagePath('logo/logo.svg')} alt="logo" styleName="logo" />
        <span styleName="name">
          IMOTO
        </span>
      </div>
    )
  }
}

export default cssModules(Logo, styles)

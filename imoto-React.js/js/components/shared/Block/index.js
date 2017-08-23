import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import css from './index.pcss'

class Block extends Component {
  render() {
    const { src, description, header } = this.props
    return (
      <div styleName="main">
        <div styleName="content">
          <div styleName="img">
            <img src={src} alt="" />
          </div>
          <div styleName="wrapper">
            <div styleName="description">
              {description}
            </div>
            <div styleName="head">
              {header}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default cssModules(Block, css, { allowMultiple: true })


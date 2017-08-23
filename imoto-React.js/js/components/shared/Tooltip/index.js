import React, { Component, PropTypes } from 'react'
import cssModules from 'react-css-modules'
import styles from './index.pcss'


class Tooltip extends Component {
  render() {
    const { text } = this.props
    return (
      <div>
        <div styleName="tooltip">
          <span styleName="tooltip-text">
            {text}
          </span>
        </div>
      </div>
    )
  }
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired
}

export default cssModules(Tooltip, styles, { allowMultiple: true })

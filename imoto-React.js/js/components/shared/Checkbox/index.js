import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import R from 'ramda'
import styles from './index.pcss'

class Checkbox extends Component {
  render() {
    const { description } = this.props
    const permittedProps = R.omit(['description', 'styles'], this.props)

    return (
      <div>
        <label htmlFor="checkbox" styleName="label-wrapper">
          <input {...permittedProps} type="checkbox" styleName="hidden-input" />
          <div styleName="check-mark" />
          <div styleName="description">
            {description}
          </div>
        </label>
      </div>
    )
  }
}

export default cssModules(Checkbox, styles, { allowMultiple: true })

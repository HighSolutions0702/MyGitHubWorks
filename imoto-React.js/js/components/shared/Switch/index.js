import React, { Component, PropTypes } from 'react'
import cssModules from 'react-css-modules'
import classnames from 'classnames'
import styles from './index.pcss'

class Switch extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { onChange, value } = this.props
    onChange(!this.props.value)
  }

  render() {
    const { value } = this.props

    return (
      <div styleName="wrapper" onClick={this.handleClick}>
        <div styleName="switch">
          <input
            type="checkbox"
            checked={!!value}
          />
          <div styleName="slider round" />
        </div>
      </div>
    )
  }
}

Switch.propTypes = {
  onChange:  PropTypes.func.isRequired
}

Switch.defaultProps = {
  value: false
}

export default cssModules(Switch, styles,
  { allowMultiple: true })

import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import classNames from 'classnames'
import R from 'ramda'
import css from 'components/shared/Fields/index.pcss'

class Input extends Component {
  render() {
    const { errorMsg, id, disabled, holder, touched, hasError, simpleInput, fieldClassName, value } = this.props

    const shouldValidate = touched || value

    const fieldClasses = classNames(
      'fl-input',
      { 'fl-valid': shouldValidate && !hasError },
      { 'fl-invalid': shouldValidate && hasError },
      { 'has-value': value },
      fieldClassName
    )
    const labelClasses = classNames(
      'fl-input-label',
      { 'fl-input-label-disable': disabled }
    )
    const errMsgClasses = classNames(
      { 'fl-error-msg': errorMsg },
      { 'fl-error-show': hasError && shouldValidate && errorMsg }
    )
    const iconClasses = classNames(
      'icon-wrapper',
      { 'error-icon': hasError && shouldValidate },
      { 'accept-icon': !hasError && shouldValidate }
    )
    const permittedProps = R.omit(['holder', 'errorMsg', 'touched', 'hasError', 'styles', 'simpleInput'], this.props)
    return (
      <div styleName="main">
        {
          simpleInput ?
            <div styleName="simple-input">
              <input
                {...permittedProps}
                styleName={fieldClasses}
              />
              { errorMsg && <span styleName={errMsgClasses}>{errorMsg}</span> }
            </div>
          :
            <div styleName="fl-input-container">
              <input
                {...permittedProps}
                styleName={fieldClasses}
              />
              <label styleName={labelClasses} htmlFor={id}>{holder}</label>
              <span styleName="fl-input-bar" />
              { errorMsg && <span styleName={errMsgClasses}>{errorMsg}</span> }
              { !disabled && <div styleName={iconClasses} /> }
            </div>
        }
      </div>
    )
  }
}

export default cssModules(Input, css, { allowMultiple: true })

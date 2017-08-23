import classNames from 'classnames'
import React, { PropTypes } from 'react'
import cssModules from 'react-css-modules'
import css from './index.pcss'

function Button({
  color,
  size,
  fullwidth,
  inversed,
  shadow,
  styles,
  ...props
}) {
  return (
    <button
      styleName={classNames('button', color, size, { fullwidth, inversed, shadow })}
      {...props}
    />
  )
}

Button.defaultProps = {
  size:      'normal',
  color:     'orange',
  fullwidth: false,
  inversed:  false,
  type:      'button',
  shadow:    false
}

Button.propTypes = {
  size:      PropTypes.oneOf(['small', 'xxsmall', 'xsmall', 'normal', 'xnormal', 'large', 'xlarge']).isRequired,
  color:     PropTypes.string.isRequired,
  fullwidth: PropTypes.bool.isRequired,
  inversed:  PropTypes.bool.isRequired
}

export default cssModules(Button, css, { allowMultiple: true })

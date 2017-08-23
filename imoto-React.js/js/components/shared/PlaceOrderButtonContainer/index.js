import React, { Component, PropTypes } from 'react'
import Button from 'components/shared/Button'
import { Link } from 'react-router'

class PlaceOrderButtonContainer extends Component {
  render() {
    const { shadow } = this.props
    return (
      <Button size="large" shadow={shadow}>
        PLACE ORDER
      </Button>
    )
  }
}

Button.propTypes = {
  shadow:  PropTypes.bool.isRequired
}

export default PlaceOrderButtonContainer

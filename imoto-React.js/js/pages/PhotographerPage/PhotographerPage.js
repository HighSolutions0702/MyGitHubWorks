import React, { Component } from 'react'
import Photographer from 'components/Photographer/Container'
import R from 'ramda'

class PhotographerPage extends Component {
  render() {
    return <Photographer child={this.props.children} path={R.last(this.props.location.pathname.split('/'))} />
  }
}

export default PhotographerPage

import { Component, createElement } from 'react'
import { connect } from 'react-redux'
import * as Modal from './index'

class Main extends Component {
  render() {
    const { show, component, payload } = this.props
    if (!show) {
      return null
    }
    return createElement(Modal[component], payload)
  }
}


function select(state) {
  return state.modal
}

export default connect(select)(Main)

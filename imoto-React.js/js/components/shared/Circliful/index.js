import React, { Component } from 'react'
import $ from 'jquery'
import 'jquery-circliful/js/jquery.circliful'
import cssModules from 'react-css-modules'
import styles from './index.pcss'

class Circliful extends Component {
  componentDidMount() {
    this.$node = $(this.refs.circliful)
  }

  componentWillReceiveProps(nextProps) {
    if (!this.circ && (nextProps.percent || nextProps.percent === 0)) {
      this.circ = this.$node.circliful(nextProps)
    }
  }

  shouldComponentUpdate() {
    return true
  }

  componentWillUnmount() {

  }


  render() {
    return (<div ref="circliful" />)
  }
}

export default cssModules(Circliful, styles, { allowMultiple: true })

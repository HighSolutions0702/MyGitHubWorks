import React, { Component } from 'react'
import { queries } from 'apollo'
import cssModules from 'react-css-modules'
import styles from './index.pcss'

class OrderDropDown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hideOptions: true
    }
    this.hideOptions = this.hideOptions.bind(this)
  }

  hideOptions() {
    this.setState({
      hideOptions: !this.state.hideOptions
    })
  }
  render() {
    const { handler, currentFilter } = this.props
    return (
      <div styleName="orderDropDown">
        <button styleName="deployDropDown" onClick={this.hideOptions} >Filter</button>
        {!this.state.hideOptions &&
          <div styleName="dropDownOptions">
            <div styleName="square" />
            <button onClick={(e) => handler(e, 'pending')}>Upload Need <div styleName="greenSmallSquare" /></button>
            <button onClick={(e) => handler(e, 'in_progress')}>Processing <div styleName="yellowSmallSquare" /></button>
            <button onClick={(e) => handler(e, 'completed')}>Completed <div styleName="orangeSmallSquare" /></button>
          </div>
        }
      </div>
    )
  }

}

export default cssModules(OrderDropDown, styles)

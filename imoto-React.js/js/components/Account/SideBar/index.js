import React, { Component } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { imagePath } from 'utils/helpers'
import cssModules from 'react-css-modules'
import types from 'constants/actionTypes'
import styles from './index.pcss'

class SideBar extends Component {
  constructor() {
    super()
    this.handleLogout = this.handleLogout.bind(this)
  }
  handleLogout() {
    this.props.dispatch({ type: types.USER_LOGOUT_REQUEST, payload: { role: this.props.user.role } })
  }
  render() {
    const { userName, avatar, path, user } = this.props

    return (
      <div styleName="wrapper">
        <div styleName="user-container">
          <div styleName="user-img">
            <img src={avatar || imagePath('/user.png')} alt="avatar" styleName="avatar" />
          </div>
          <div styleName="user-name">{userName}</div>
        </div>
        <div styleName="field-fullwidth">
          <div styleName="description-container">
            <Link
              styleName={classNames('sidebar-menu', { active: path === 'orders' })}
              to="/account/orders"
            >
              MY ORDERS
            </Link>
            <Link
              styleName={classNames('sidebar-menu', { active: path === 'details' })}
              to="/account/details"
            >
              ACCOUNT DETAILS
            </Link>
            <span styleName="sidebar-menu" onClick={this.handleLogout}>LOG OUT</span>
          </div>
        </div>
      </div>
    )
  }
}

function select(state) {
  return {
    user: state.currentUser
  }
}

export default connect(select)(cssModules(SideBar, styles, { allowMultiple: true }))

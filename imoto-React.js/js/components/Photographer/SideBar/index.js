import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { imagePath } from 'utils/helpers'
import cssModules from 'react-css-modules'
import classNames from 'classnames'
import styles from './index.pcss'

class SideBar extends Component {

  render() {
    const { fullName, avatar, path } = this.props
    return (
      <div styleName="wrapper">
        <div styleName="user-container">
          <div styleName="user-img">
            <img
              src={avatar || imagePath('/user.png')} alt="avatar"
              styleName="avatar"
            />
          </div>
          <div styleName="user-name">{fullName}</div>
        </div>
        <div styleName="field-fullwidth">
          <div styleName="description-container">
            <Link
              to="/photographer"
              styleName={classNames('sidebar-menu', { active: path === '' })}
            >MY
              DASHBOARD</Link>
            <Link
              to="/photographer/calendar"
              styleName={classNames('sidebar-menu',
                    { active: path === 'calendar' })}
            >CALENDAR</Link>
            <Link
              to="/photographer/orders"
              styleName={classNames('sidebar-menu',
                    { active: path === 'orders' })}
            >ORDERS</Link>
            <Link
              to="/photographer/details"
              styleName={classNames('sidebar-menu',
                    { active: path === 'details' })}
            >ACCOUNT INFO</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(cssModules(SideBar, styles, { allowMultiple: true }))

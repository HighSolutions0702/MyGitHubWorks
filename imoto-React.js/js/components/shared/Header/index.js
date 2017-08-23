import React, { Component } from 'react'
import { connect } from 'react-redux'
import ClickOutside from 'react-click-outside'
import classNames from 'classnames'
import { imagePath } from 'utils/helpers'
import cssModules from 'react-css-modules'
import Logo from 'components/shared/Logo'
import Button from 'components/shared/Button'
import types from 'constants/actionTypes'
import { Link } from 'react-router'
import styles from './index.pcss'
import items from './subheaderItems.js'
import DropDownSubMenu from './DropDownSubMenu'

class Header extends Component {
  constructor(props) {
    super(props)
    this.showMobileMenu = this.showMobileMenu.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.handleScroll = this.handleScroll.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.state = {
      displayMenu: false
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  handleClickOutside() {
    this.setState({ displayMenu: false })
  }
  handleScroll() {
    const { opacityHeader, dispatch } = this.props
    if (window.scrollY > 0 && opacityHeader) {
      dispatch({ type: types.HIDE_OPACITY_HEADER })
    } else if (window.scrollY === 0) {
      dispatch({ type: types.SHOW_OPACITY_HEADER })
    }
  }
  handleLogout() {
    this.props.dispatch({ type: types.USER_LOGOUT_REQUEST, payload: { role: this.props.user.role } })
  }
  showMobileMenu() {
    const { displayMenu } = this.state
    this.setState({ displayMenu: !displayMenu })
  }
  render() {
    const { displayMenu } = this.state
    const { user, route, opacityHeader } = this.props
    return (
      <div styleName={classNames('main', { 'home-main': (route === '/' || route === '/about') && opacityHeader })}>
        <div className="root" styleName="wrapper">
          <ClickOutside onClickOutside={this.handleClickOutside} styleName="content">
            <div styleName="section">
              <div styleName="logo-container">
                <Link to="/">
                  <Logo />
                </Link>
              </div>
              { (!user || user.role !== 'Photographer') &&
              <div styleName={classNames('wrapper-menu-header', { 'element-diplay': !displayMenu })}>
                <div styleName="menu-header">
                  <div styleName={classNames('header', 'header-diplay')}>
                    <Link to="/">HOME</Link>
                  </div>
                  <div styleName="header">
                    <div styleName="wrapper-triangle" />
                    <div styleName="drop-down-sub-menu">
                      <DropDownSubMenu items={items} routeToPage={this.routeToPage} />
                    </div>
                    <Link to="/product">PRODUCTS</Link>
                  </div>
                  <div styleName="header">
                    <Link>RESOURCES</Link>
                  </div>
                  <div styleName="header">
                    <Link to="/about">ABOUT</Link>
                  </div>
                  <div styleName="header">
                    <Link>CONTACT US</Link>
                  </div>
                  <div styleName="more-wrapper">
                    <img src={imagePath('icons/three-dots.svg')} alt="more" />
                  </div>
                </div>
              </div>}
              {user && user.role === 'Photographer' &&
              <div styleName={classNames('wrapper-menu-header', { 'element-diplay': !displayMenu })}>
                <div styleName="menu-header">
                  <div styleName={classNames('header', 'header-diplay')}>
                    <Link to="/">HOME</Link>
                  </div>
                  <div styleName="header">
                    <Link to="/photographer/index">DASHBOARD</Link>
                  </div>
                  <div styleName="header">
                    <Link to="/photographer/calendar">CALENDAR</Link>
                  </div>
                  <div styleName="header">
                    <Link to="/photographer/orders">ORDERS</Link>
                  </div>
                  <div styleName="header">
                    <Link to="/photographer/details">ACCOUNT INFO</Link>
                  </div>
                </div>
              </div>}
            </div>
            <div styleName="buttons-container">
              <div styleName="mobile-menu-button" onClick={this.showMobileMenu}>
                <div styleName="line" />
                <div styleName="line" />
              </div>
              <div styleName="buttons">
                {(!user || !user.isLoggedIn || user.role === 'Customer') &&
                  <Link to={'/order'}>
                    <Button styleName="order-button">
                      PLACE ORDER
                    </Button>
                  </Link>
                }
                {user && user.isLoggedIn &&
                 user.role === 'Customer' &&
                 <Link to="/account">
                   <Button color="white-gray">
                      MY ACCOUNT
                    </Button>
                 </Link>
                }
                {user && user.isLoggedIn &&
                 user.role === 'Photographer' &&
                 <Button color="transparent-orange" onClick={this.handleLogout}>
                  LOG OUT
                 </Button>
                }
                {user && !user.isLoggedIn &&
                  <Link to="/login">
                    <Button color="white-gray" size="small">
                      LOG IN
                    </Button>
                  </Link>
                }
              </div>
            </div>
          </ClickOutside>
        </div>
      </div>
    )
  }
}

function select(state) {
  return {
    user: state.currentUser,
    opacityHeader: state.opacityHeader,
    route: state.routing.locationBeforeTransitions.pathname
  }
}

export default connect(select)(cssModules(Header, styles, { allowMultiple: true }))

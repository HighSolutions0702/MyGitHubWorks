import React, { Component } from 'react'
import Account from 'components/Account'
import R from 'ramda'

class AccountPage extends Component {
  render() {
    return <Account child={this.props.children} path={R.last(this.props.location.pathname.split('/'))} />
  }
}

export default AccountPage

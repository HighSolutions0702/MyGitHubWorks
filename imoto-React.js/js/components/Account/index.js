import React, { Component, cloneElement } from 'react'
import { graphql } from 'react-apollo'
import { queries } from 'apollo'
import SideBar from 'components/Account/SideBar'
import Layout from 'components/shared/Layout'
import cssModules from 'react-css-modules'
import styles from './index.pcss'

class Account extends Component {
  render() {
    const { child, path, data: { customer, refetch } } = this.props

    return (
      <Layout>
        <div styleName="account-wrapper">
          <div className="root">
            <div styleName="row">
              <div styleName="content">
                { cloneElement(child, { customer, refetch }) }
              </div>
              <div styleName="side-bar">
                <SideBar
                  userName={customer && customer.full_name}
                  avatar={customer && customer.avatar}
                  path={path}
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default graphql(
  queries.getCustomer, {
    options: {
      forceFetch: true,
      ssr: false
    }
  }
)(cssModules(Account, styles))

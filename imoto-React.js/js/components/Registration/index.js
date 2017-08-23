import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from 'components/shared/Layout'
import cssModules from 'react-css-modules'
import styles from './index.pcss'
import RegistrationAgentForm from './RegistrationAgentForm'
import RegistrationHomeownerForm from './RegistrationHomeownerForm'
import GetStarted from './GetStarted'


class Registration extends Component {

  render() {
    const { currentRoute } = this.props

    return (
      <Layout>
        <div styleName="main">
          <div className="root">
            <div styleName="wrapper">
              {(() => {
                switch (currentRoute) {
                  case '/registration-homeowner': return <RegistrationHomeownerForm />
                  case '/registration-agent': return <RegistrationAgentForm />
                  case '/get-started': return <GetStarted />
                  default: return null
                }
              })()}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

function select(state) {
  return {
    currentRoute: state.routing.locationBeforeTransitions.pathname
  }
}

export default connect(select)(cssModules(Registration, styles))

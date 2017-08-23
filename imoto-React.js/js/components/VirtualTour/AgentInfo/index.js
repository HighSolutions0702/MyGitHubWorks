import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from 'components/VirtualTour/AgentInfo/index.pcss'
import { imagePath } from 'utils/helpers'

class AgentInfo extends Component {
  render() {
    const { order } = this.props
    let customer

    if (!order) {
      customer = {
        full_name: 'John Doe',
        mobile: '+1 800 465-3434',
        email: 'email@example.com',
        company: {
          name: 'Company',
          website: 'http://example.com'
        }
      }
    } else {
      customer = order.customer
    }


    return (
      <div styleName="wrapper">
        <div className="root">
          <div styleName="header" >
            REAL ESTATE AGENT
          </div>
          <div styleName="row">
            <div styleName="agent-photo">
              <img src={imagePath('agent-photo.png')} alt="" />
            </div>
            <div styleName="agent-info">
              <div styleName="agent-name">{customer.full_name}</div>
              <div styleName="info-row">
                <span styleName="name">Company: </span>
                <span styleName="description">{customer.company.name}</span>
              </div>
              <div styleName="info-row">
                <span styleName="name">Phone: </span>
                <span styleName="description">{customer.mobile}</span>
              </div>
              <div styleName="info-row">
                <span styleName="name">E-mail: </span>
                <span styleName="description">{customer.email}</span>
              </div>
              <div styleName="info-row">
                <span styleName="name">Website: </span>
                <span styleName="email">{customer.company.website}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default cssModules(AgentInfo, styles)

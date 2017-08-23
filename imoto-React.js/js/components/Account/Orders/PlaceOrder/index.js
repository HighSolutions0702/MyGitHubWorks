import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router'
import Button from 'components/shared/Button'
import { imagePath } from 'utils/helpers'
import { queries } from 'apollo'
import cssModules from 'react-css-modules'
import styles from './index.pcss'

class PlaceOrder extends Component {
  render() {
    return (
      <div styleName="main">
        <div styleName="head-container">
          <span styleName="name">Order History</span>
          <span styleName="description">Here, you can view your orders, views and print recipts, download products and services.</span>
        </div>
        <div className="field-fullwidth">
          <div styleName="place-order-container">
            <div styleName="order">
              <img src={imagePath('icons/order.svg')} alt="" />
            </div>
            <div styleName="header-place-order">
              Place an order
            </div>
            <div styleName="description-place-order">
              Lorem Ipsum has been the industry
              standard filler text since the year
            </div>
            <div styleName="submit-container">
              <Link to={'/order'}>
                <Button
                  size="normal"
                  type="submit"
                  color="orange"
                >
                  PLACE ORDER
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default cssModules(PlaceOrder, styles)

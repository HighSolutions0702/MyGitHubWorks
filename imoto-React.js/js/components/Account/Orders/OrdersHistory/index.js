import React, { Component } from 'react'
import ClickOutside from 'react-click-outside'
import OptionsBlock from 'components/shared/OptionsBlock'
import classNames from 'classnames'
import { imagePath } from 'utils/helpers'
import types from 'constants/actionTypes'
import cssModules from 'react-css-modules'
import styles from './index.pcss'

class OrdersHistory extends Component {
  constructor(props) {
    super(props)
    this.searchOrder = this.searchOrder.bind(this)
    this.showOptionsBlock = this.showOptionsBlock.bind(this)
    this.toogleOrderInformContainer = this.toogleOrderInformContainer.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }
  handleClickOutside() {
    this.props.dispatch({
      type: types.CLOSE_OPTIONS_BLOCK
    })
  }
  searchOrder(e) {
    this.props.dispatch({
      type: types.FILTER_ORDERS_LIST,
      payload: e.target.value.toLowerCase()
    })
  }
  showOptionsBlock(uniqueOrderNumber) {
    this.props.dispatch({
      type: types.SHOW_OPTIONS_BLOCK,
      payload: uniqueOrderNumber
    })
  }
  toogleOrderInformContainer(isOpenedInformContainer, id) {
    this.props.dispatch({
      type: isOpenedInformContainer ? types.CLOSE_ORDER_INFORM_CONTAINER : types.SHOW_ORDER_INFORM_CONTAINER,
      payload: id
    })
  }
  render() {
    const { orders } = this.props
    return (
      <div styleName="main">
        <div styleName="head-container">
          <div styleName="head-description">
            <span styleName="name">
              Order History
            </span>
            <span styleName="description">
              Here, you can view your orders, views
              and print recipts, download products and services.
            </span>
          </div>
          <input
            name="search"
            type="text"
            placeholder="Search order"
            onChange={this.searchOrder}
          />
        </div>
        <div styleName="table">
          <div styleName="head-row">
            <div styleName="col">
              Address
            </div>
            <div styleName="col">
              Order #
            </div>
            <div styleName="col">
              Date
            </div>
            <div styleName="col">
              Status
            </div>
          </div>
          {
            orders && orders.map((item, index) => (
              <div key={index}>
                <div
                  styleName="row"
                  onClick={() => this.toogleOrderInformContainer(item.isOpenedInformContainer, item.id)}
                >
                  <div styleName="col">
                    {item.address}
                  </div>
                  <div styleName="col">
                    {item.id}
                  </div>
                  <div styleName="col">
                    <span styleName="date">
                      {item.date}
                    </span>
                  </div>
                  <div styleName="col">
                    <div styleName={classNames('status', { pending: item.status === 'Pending' }, { ready: item.status === 'Ready for Delivery' })}>
                      {item.status.replace(/_/g, ' ')}
                    </div>
                    <div onClick={e => e.stopPropagation()}>
                      <div styleName="wrapper-optionsblock-container">
                        {
                          item.isOpenedOptionsBlock &&
                          <div styleName="optionsblock-container">
                            <OptionsBlock id={item.id} slug={item.slug} />
                          </div>
                        }
                      </div>
                      <ClickOutside onClickOutside={this.handleClickOutside}>
                        <div
                          styleName={classNames('cursor', { activeDots: item.isOpenedOptionsBlock })}
                          onClick={() => this.showOptionsBlock(item.id)}
                        >
                          <img src={imagePath('icons/mark_more.svg')} alt="" />
                        </div>
                      </ClickOutside>
                    </div>
                  </div>
                </div>
                {
                  item.isOpenedInformContainer &&
                  <div styleName="inform-container">
                    <div styleName="wrapper-row-container">
                      <div styleName="row-container">
                        <div styleName="header-inform">
                          #{item.id} <span styleName="date">({item.date})</span>
                        </div>
                        <div styleName={classNames('date', 'header-inform')}>
                          07/4 at 12:00 pm
                        </div>
                        <div styleName={classNames('status', 'header-inform', { pending: item.status === 'Pending' }, { ready: item.status === 'Ready for Delivery' })}>
                          {item.status}
                        </div>
                        <div styleName="header-inform">
                          $ 54
                        </div>
                      </div>
                      <div
                        styleName="cursor"
                        onClick={() => this.toogleOrderInformContainer(item.isOpenedInformContainer, item.id)}
                      >
                        <img src={imagePath('icons/orange_arrow.svg')} alt="" />
                      </div>
                    </div>
                    <div styleName="wrapper-row-container">
                      <div styleName="row-container">
                        <div styleName="col-container">
                          <div styleName="col-description">
                            <span styleName="parameters">Listing Address:</span> {item.address}
                          </div>
                          <div styleName="col-description">
                            <span styleName="parameters">Invoice:</span> invoice_12.pdf
                          </div>
                          <div styleName="col-description">
                            <span styleName="reschedule">Reschedule:</span> 12:00 pm
                            <div styleName="clock">
                              <img src={imagePath('icons/clock.svg')} alt="" />
                            </div>
                          </div>
                        </div>
                        <div styleName="col-container">
                          <span styleName="options">Download all MLS</span>
                          <span styleName="options">Download all PRINT</span>
                          <div styleName="options">Virtual Tour
                            <div styleName="arrow-wrapper">
                              <img src={imagePath('icons/orange_right-arrow.svg')} alt="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                }
              </div>
              ))
            }
        </div>
      </div>
    )
  }
}

export default cssModules(OrdersHistory, styles, { allowMultiple: true })

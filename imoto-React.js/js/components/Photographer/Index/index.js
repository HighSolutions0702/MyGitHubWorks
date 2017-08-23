import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { queries } from 'apollo'
import { imagePath } from 'utils/helpers'
import SideBar from 'components/Photographer/SideBar'
import cssModules from 'react-css-modules'
import * as normalize from 'utils/normalizeSchema'
import styles from './index.pcss'
import Circliful from '../../shared/Circliful/index'

class Photographer extends Component {
  render() {
    const { child, path, data: { photographer, refetch } } = this.props
    const totalOrdersCount = photographer && photographer.total_orders_count
    const uploadedOrdersCount = photographer &&
      photographer.uploaded_orders_count
    const remainingOrderCount = totalOrdersCount - uploadedOrdersCount
    const photoShootTodayCount = photographer &&
      photographer.photo_shoot_today_count
    const photoShootCompletedCount = photographer &&
      photographer.photo_shoot_completed_count
    const remainingPhotoShootCount = photoShootTodayCount -
      photoShootCompletedCount
    const earnings = photographer && photographer.earnings && normalize.currency(photographer.earnings)

    return (
      <div className="root">
        {
          remainingPhotoShootCount && remainingPhotoShootCount > 0 ?
            <div styleName="message">
              <div styleName="warning-img-wrap">
                <img src={imagePath('icons/exclamation.svg')} alt="" />
              </div>
              <div styleName="message-text">
                <span styleName="warning-text">Warning message:</span>
                <span> You have {remainingPhotoShootCount} photo shoots that still need to be uploaded. </span>
                <span styleName="link-text"> Upload Now</span>
              </div>
              <img
                src={imagePath('icons/grey-cross.svg')} alt=""
                styleName="close-button"
              />
            </div>
            : null
        }
        <div styleName="row">
          <div styleName="content">
            <div styleName="wrapper">
              <div styleName="wrapper-head-container">

                <span styleName="block-title">Orders Uploaded</span>

              </div>
              <div styleName="block-content">
                <div>
                  <span
                    styleName="title-description"
                  >Total orders: {totalOrdersCount}
                    ({remainingOrderCount} remaining)</span>
                  <div styleName="dia-wrapper">
                    {/* <img src={imagePath('icons/Percentage.png')} alt="" />*/}
                    <div styleName="circliful-wrapper">
                      <Circliful
                        replacePercentageByText={' '}
                        noPercentageSign={false}
                        foregroundBorderWidth={11}
                        backgroundBorderWidth={11}
                        foregroundColor={'#FD9830'}
                        backgroundColor={'#EAEBED'}
                        textColor={'#FD9830'}
                        start={50}
                        percent={photographer && (photographer.total_orders_count !== 0 ? (photographer.uploaded_orders_count / photographer.total_orders_count) * 100 : 100)}
                      />
                    </div>
                    <div styleName="orders-dia-text-orders"><span styleName="large-font">{uploadedOrdersCount}</span><span styleName="dia-text-divider">/</span><span>{totalOrdersCount}</span></div>
                    <div styleName="dia-description">Orders Uploaded</div>
                  </div>
                </div>
                <div styleName="legend">
                  <div styleName="legend-half">
                    <img
                      src={imagePath('icons/grey-dot.png')} alt=""
                      styleName="dot"
                    />
                    <span styleName="title-description">Total orders</span>
                  </div>
                  <div styleName="legend-half">
                    <img
                      src={imagePath('icons/orange-dot.png')} alt=""
                      styleName="dot"
                    />
                    <span
                      styleName="title-description"
                    >Orders Uploaded</span>
                  </div>
                </div>
              </div>
            </div>

            <div styleName="wrapper">
              <div styleName="wrapper-head-container">
                <span styleName="name">Photo Shoots Today</span>
              </div>
              <div styleName="block-content">
                <span
                  styleName="title-description"
                >Total Shoots: {photoShootTodayCount}</span>
                <div styleName="dia-wrapper">
                  {/* <img src={imagePath('icons/Percentage2.png')} alt="" />*/}
                  <div styleName="circliful-wrapper">
                    <Circliful
                      replacePercentageByText={' '}
                      noPercentageSign={false}
                      foregroundBorderWidth={11}
                      backgroundBorderWidth={11}
                      foregroundColor={'#03A8F3'}
                      backgroundColor={'#EAEBED'}
                      textColor={'#03A8F3'}
                      start={50}
                      percent={photographer && (photographer.photo_shoot_today_count !== 0 ? (photographer.photo_shoot_completed_count / photographer.photo_shoot_today_count) * 100 : 100)}
                    />
                  </div>
                  <div styleName="shoots-dia-text-orders"><span styleName="large-font">{photoShootCompletedCount}</span><span styleName="dia-text-divider">/</span><span>{photoShootTodayCount}</span></div>
                  <div styleName="dia-description">Shoots Completed</div>

                </div>
                <div styleName="legend">
                  <div styleName="legend-half">
                    <img
                      src={imagePath('icons/grey-dot.png')} alt=""
                      styleName="dot"
                    />
                    <span
                      styleName="title-description"
                    >Total Photo Shoots</span>
                  </div>
                  <div styleName="legend-half">
                    <img
                      src={imagePath('icons/blue-dot.png')} alt=""
                      styleName="dot"
                    />
                    <span
                      styleName="title-description"
                    >Shoots Completed</span>
                  </div>
                </div>
              </div>
            </div>

            <div styleName="wrapper">
              <div styleName="wrapper-head-container">
                <span styleName="name">Earnings</span>
              </div>
              <div styleName="block-content">
                <div styleName="earnings-wrapper">
                  <img src={imagePath('icons/coins.png')} alt="" />
                  <span styleName="earnings">{earnings}</span>
                </div>
              </div>
            </div>

            <div styleName="wrapper">
              <div styleName="wrapper-head-container">
                <span styleName="name">Resources</span>
              </div>
              <div styleName="block-content">

                <div styleName="resource-wrapper">
                  <img src={imagePath('icons/edit.png')} alt="" />
                  <div styleName="resource-text">
                    <span>Photo Shoot Tutorial</span>
                    <div styleName="link-text">GOOGLE DOC</div>
                  </div>
                </div>

                <div styleName="resource-wrapper">
                  <img src={imagePath('icons/edit.png')} alt="" />
                  <div styleName="resource-text">
                    <span>How to Upload Orders</span>
                    <div styleName="link-text">GOOGLE DOC</div>
                  </div>
                </div>

                <div styleName="resource-wrapper">
                  <img src={imagePath('icons/edit.png')} alt="" />
                  <div styleName="resource-text">
                    <span>How to Make Floor Plans</span>
                    <div styleName="link-text">GOOGLE DOC</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div styleName="side-bar">
            <SideBar
              fullName={photographer && photographer.full_name}
              avatar={photographer && photographer.avatar}
              path={path}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default graphql(
  queries.getPhotographer, {
    options: {
      forceFetch: true,
      ssr: false,
      variables: {
        withCounts: true
      }
    }
  }
)(cssModules(Photographer, styles))

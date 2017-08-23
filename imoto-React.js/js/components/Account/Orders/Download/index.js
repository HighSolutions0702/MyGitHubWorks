import React, { Component } from 'react'
import { connect } from 'react-redux'
import Collapse from 'react-collapse'
import TransitionGroup from 'react-addons-transition-group'
import FadeUpContainer from 'components/shared/FadeUpContainer'
import { Link } from 'react-router'
import classNames from 'classnames'
import types from 'constants/actionTypes'
import Button from 'components/shared/Button'
import DownloadBlock from 'components/shared/DownloadBlock'
import ClickOutside from 'react-click-outside'
import cssModules from 'react-css-modules'
import { imagePath } from 'utils/helpers'
import styles from './index.pcss'

class Download extends Component {
  constructor(props) {
    super(props)
    this.showDownloadBlock = this.showDownloadBlock.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.selectOrdersWork = this.selectOrdersWork.bind(this)
    this.selectAllOrdersWorkOfMenuItem = this.selectAllOrdersWorkOfMenuItem.bind(this)
    this.showMenuItemWorks = this.showMenuItemWorks.bind(this)
  }
  showMenuItemWorks(itemName) {
    this.props.dispatch({
      type: types.SHOW_MENU_ITEM_WORKS,
      payload: itemName
    })
  }
  selectAllOrdersWorkOfMenuItem(itemName) {
    this.props.dispatch({
      type: types.SELECT_ALL_ORDERS_WORK_OF_MENU_ITEM,
      payload: itemName
    })
  }
  selectOrdersWork(idWork, itemName) {
    this.props.dispatch({
      type: types.SELECT_ORDERS_WORK,
      payload: {
        idWork,
        itemName
      }
    })
  }
  handleClickOutside() {
    this.props.dispatch({
      type: types.CLOSE_DOWNLOAD_BLOCK
    })
  }
  showDownloadBlock(itemName) {
    this.props.dispatch({
      type: types.SHOW_DOWNLOAD_BLOCK,
      payload: itemName
    })
  }
  render() {
    const { menuList, params: { download } } = this.props
    return (
      <div styleName="wrapper">
        <div styleName="main">
          <div styleName="head-container">
            <div styleName="head-left-field">
              <Link to={'/account/orders'}>
                <div styleName="arrow-left-gray">
                  <img src={imagePath('arrows/arrow-left-gray.svg')} alt="" />
                </div>
                <div styleName="head-description">
                  <div styleName="name">
                    ORDER #{download}
                  </div>
                  <div styleName="description">
                    5938 Watercrest Way,
                    New Orleans, LA 70123
                  </div>
                </div>
              </Link>
            </div>
            <div styleName="head-right-field" />
          </div>
          {
            menuList.map((item, index) => (
              <div key={index}>
                <div styleName="menu-item">
                  <div styleName="left-field">
                    <div
                      styleName={
                        classNames('orange-arrow', {
                          activeArrow: item.isOpenedMenuItemWorks
                        }, {
                          noactiveArrow: !item.isOpenedMenuItemWorks
                        })
                      }
                      onClick={() => this.showMenuItemWorks(item.itemName)}
                    >
                      <img src={imagePath('arrows/orange_arrow.svg')} alt="" />
                    </div>
                    <div styleName="header">
                      {item.itemName}
                    </div>
                    <div styleName="black-arrow">
                      <img src={imagePath('icons/black-arrow.svg')} alt="" />
                    </div>
                  </div>
                  <ClickOutside onClickOutside={this.handleClickOutside}>
                    <div
                      styleName={classNames('cursor', { activeDots: item.isOpenedDownloadBlock })}
                      onClick={() => this.showDownloadBlock(item.itemName)}
                    >
                      <img src={imagePath('icons/mark_more.svg')} alt="" />
                    </div>
                    <div styleName="wrapper-downloadblock-container">
                      {
                        item.isOpenedDownloadBlock &&
                        <div styleName="downloadblock-container">
                          <DownloadBlock />
                        </div>
                      }
                    </div>
                  </ClickOutside>
                </div>
                <Collapse
                  keepCollapsedContent
                  isOpened={item.isOpenedMenuItemWorks}
                  springConfig={{ stiffness: 120, damping: 30 }}
                >
                  <TransitionGroup>
                    {
                      item.isOpenedMenuItemWorks &&
                      <FadeUpContainer
                        delayEnter={0.2}
                        delayLeave={0.2}
                      >
                        <div styleName="row-parameters">
                          <div styleName="left-field">
                            <div
                              styleName="square"
                              onClick={() => this.selectAllOrdersWorkOfMenuItem(item.itemName)}
                            >
                              <div styleName={classNames({ activeCross: item.isSelectedAllWorks })} />
                            </div>
                            <div styleName="header-parameter">
                              Name
                            </div>
                          </div>
                          <div styleName="right-field">
                            <div styleName="parameter-size">
                              <span styleName="header-parameter">
                                Files size
                              </span>
                            </div>
                            <div styleName="parameter-kind">
                              <span styleName="header-parameter">
                                Kind
                              </span>
                            </div>
                          </div>
                        </div>
                      </FadeUpContainer>
                    }
                  </TransitionGroup>
                  {
                    item.orderWorks && item.orderWorks.map((work, indexWork) => (
                      <TransitionGroup key={indexWork}>
                        {
                          item.isOpenedMenuItemWorks &&
                          <FadeUpContainer
                            delayEnter={0.2 * (indexWork + 1)}
                            delayLeave={0.3 / (indexWork + 1)}
                          >
                            <div styleName={classNames('row-values', { activeRow: work.isSelectedWork })}>
                              <div styleName="left-field">
                                <div
                                  styleName="square"
                                  onClick={() => this.selectOrdersWork(work.idWork, item.itemName)}
                                >
                                  <div styleName={classNames({ activeCross: work.isSelectedWork })} />
                                </div>
                                <div styleName="work-description">
                                  <div styleName="work-icon">
                                    <img src={imagePath(work.imagePath)} alt="" />
                                  </div>
                                  <div styleName="work-name">
                                    {work.name}
                                    {
                                    work.workPath &&
                                      <div styleName="path">
                                        {work.workPath}
                                      </div>
                                  }
                                  </div>
                                </div>
                              </div>
                              <div styleName="right-field">
                                <div styleName="parameter-size">
                                  <span styleName="parameter">{work.size}</span>
                                </div>
                                <div styleName="parameter-kind">
                                  <span styleName="parameter">{work.kind}</span>
                                </div>
                              </div>
                            </div>
                          </FadeUpContainer>
                        }
                      </TransitionGroup>
                    ))
                  }
                </Collapse>
              </div>
            ))
          }
        </div>
        <div styleName="download-button">
          <Button
            size="xlarge"
            color="orange-white"
          >
            DOWNLOAD SELECTED
          </Button>
        </div>
      </div>
    )
  }
}

function select(state) {
  return {
    menuList: state.download.menuList
  }
}

export default connect(select)(cssModules(Download, styles, { allowMultiple: true }))

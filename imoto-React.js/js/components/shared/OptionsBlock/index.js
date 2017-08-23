import React, { Component } from 'react'
import { imagePath } from 'utils/helpers'
import { Link } from 'react-router'
import cssModules from 'react-css-modules'
import css from './index.pcss'

class OptionsBlock extends Component {
  render() {
    const { id, slug } = this.props
    return (
      <div styleName="wrapper">
        <div styleName="row-container">
          <div styleName="img-container">
            <img src={imagePath('icons/clock.svg')} alt="" />
          </div>
            RESCHEDULE
          <div styleName="arrow-container">
            <img src={imagePath('icons/black-arrow.svg')} alt="" />
          </div>
        </div>
        <div styleName="row-container">
          <div styleName="img-container">
            <img src={imagePath('icons/grey-down-arrow.svg')} alt="" />
          </div>
          <Link to={`orders/download/${id}`}>
            DOWNLOAD FILES
          </Link>
          <div styleName="arrow-container">
            <img src={imagePath('icons/black-arrow.svg')} alt="" />
          </div>
        </div>
        <div styleName="row-container">
          <div styleName="img-container">
            <img src={imagePath('icons/flag.svg')} alt="" />
          </div>
          <Link to={`/tour/${slug}`} target="_blank">
            VIRTUAL TOUR
            </Link>
          <div styleName="arrow-container">
            <img src={imagePath('icons/black-arrow.svg')} alt="" />
          </div>
        </div>
        <div styleName="row-container">
          <div styleName="img-container">
            <img src={imagePath('icons/search_black.svg')} alt="" />
          </div>
            VIEW INVOICE
          <div styleName="arrow-container">
            <img src={imagePath('icons/black-arrow.svg')} alt="" />
          </div>
        </div>
      </div>
    )
  }
}

export default cssModules(OptionsBlock, css, { allowMultiple: true })

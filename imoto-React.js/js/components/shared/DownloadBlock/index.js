import React, { Component } from 'react'
import { imagePath } from 'utils/helpers'
import cssModules from 'react-css-modules'
import css from './index.pcss'

class DownloadBlock extends Component {
  render() {
    return (
      <div styleName="wrapper">
        <div styleName="row-container">
          <div styleName="img-container">
            <img src={imagePath('icons/black-arrow.svg')} alt="" />
          </div>
            SEND FILES
        </div>
        <div styleName="row-container">
          <div styleName="img-container">
            <img src={imagePath('icons/grey-down-arrow.svg')} alt="" />
          </div>
            DOWNLOAD ALL MLS
        </div>
        <div styleName="row-container">
          <div styleName="img-container">
            <img src={imagePath('icons/grey-down-arrow.svg')} alt="" />
          </div>
            DOWNLOAD ALL PRINT
        </div>
        <div styleName="row-container">
          <div styleName="img-container">
            <img src={imagePath('icons/grey-down-arrow.svg')} alt="" />
          </div>
            DOWNLOAD ALL PRINT & MLS
        </div>
      </div>
    )
  }
}

export default cssModules(DownloadBlock, css, { allowMultiple: true })


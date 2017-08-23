import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import { imagePath } from 'utils/helpers'
import styles from './index.pcss'


class QualitiesWrapper extends Component {
  render() {
    const { items } = this.props
    return (
      <div styleName="wrapper">
        <div className="root">
          <div styleName="content">
            {
            items.map((item, index) =>
              <div key={index} styleName="item">
                <div styleName="name-section">
                  <div>
                    <img src={imagePath(item.icon)} alt="icon" />
                  </div>
                  <div styleName="header">
                    {item.header}
                  </div>
                </div>
                <div styleName="description">
                  {item.description}
                </div>
              </div>
            )
          }
          </div>
        </div>
      </div>
    )
  }
}

export default cssModules(QualitiesWrapper, styles, { allowMultiple: true })

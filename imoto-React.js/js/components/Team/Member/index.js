import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from 'components/Team/Member/index.pcss'

class Member extends Component {
  render() {
    const { name, position, description, photo } = this.props
    return (
      <div styleName="main-container">
        <div styleName="photo-container">
          <img src={photo} alt="member" />
        </div>
        <div styleName="bottom-content">
          <span styleName="name">
            {name}
          </span>
          <span styleName="position">
            {position}
          </span>
        </div>
        <div styleName="content">
          <span styleName="content-name">
            {name}
          </span>
          <span styleName="position">
            {position}
          </span>
          <div styleName="line" />
          <span styleName="description">
            {description}
          </span>
        </div>
      </div>
    )
  }
}

export default cssModules(Member, styles)

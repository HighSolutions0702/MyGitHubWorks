import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from 'components/shared/Footer/index.pcss'
import FooterMenu from 'components/shared/Footer/FooterMenu'
import FooterInfo from 'components/shared/Footer/FooterInfo'

class Footer extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <div styleName="main">
        <div styleName="wrapper" className="root">
          <FooterMenu />
          <hr styleName="line" />
          <FooterInfo />
        </div>
      </div>
    )
  }
}

export default cssModules(Footer, styles)

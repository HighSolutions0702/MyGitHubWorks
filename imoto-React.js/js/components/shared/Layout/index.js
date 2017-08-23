import React, { Component } from 'react'
import Header from 'components/shared/Header'
import Footer from 'components/shared/Footer'
import cssModules from 'react-css-modules'
import Modal from 'components/shared/Modal/Main.js'
import css from './index.pcss'

class Layout extends Component {
  render() {
    const { children } = this.props
    return (
      <div styleName="main">
        <Modal />
        <Header />
        <div styleName="root">
          {children}
        </div>
        <Footer />
      </div>
    )
  }
}

export default cssModules(Layout, css, { allowMultiple: true })


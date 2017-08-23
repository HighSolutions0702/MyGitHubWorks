import React, { Component, cloneElement } from 'react'
import Layout from 'components/shared/Layout'
import cssModules from 'react-css-modules'
import styles from './index.pcss'

class Photographer extends Component {
  render() {
    const { child, path } = this.props

    return (
      <Layout>
        <div styleName="photographer-wrapper">
          {cloneElement(child)}
        </div>
      </Layout>
    )
  }
}

export default cssModules(Photographer, styles)

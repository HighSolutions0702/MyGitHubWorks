import React, { Component } from 'react'
import Layout from 'components/shared/Layout'
import { connect } from 'react-redux'
import cssModules from 'react-css-modules'
import styles from 'components/Product/index.pcss'
import PhotoShoot from 'components/Product/PhotoShoot'
import Videos from 'components/Product/Videos'
import FloorPlan from 'components/Product/FloorPlan'
import Showcase from 'components/Product/Showcase'
import NavPanel from 'components/Product/NavPanel'
import { Element }  from 'react-scroll'
import { imagePath, productPageScroll } from 'utils/helpers'

class Product extends Component {
  componentDidMount() {
    const { hash } = this.props
    const blockName = hash.split('#/')[1]
    const scrollFunction = () => { productPageScroll(blockName) }
    if (hash) {
      setTimeout(scrollFunction, 400)
    }
  }
  render() {
    return (
      <Layout>
        <NavPanel />
        <div styleName="content">
          <Element name="photos" />
          <PhotoShoot />
          <div className="root">
            <div styleName="separator">
              <img src={imagePath('separator.png')} alt="separator" />
            </div>
          </div>
          <Element name="videos" />
          <Videos />
          <div className="root">
            <div styleName="separator">
              <img src={imagePath('separator.png')} alt="separator" />
            </div>
          </div>
          <Element name="floor-plan" />
          <FloorPlan />
          <div className="root">
            <div styleName="separator">
              <img src={imagePath('separator.png')} alt="separator" />
            </div>
          </div>
          <Element name="3d-showcase" />
          <Showcase />
          <Element name="add-ons" />
        </div>
      </Layout>
    )
  }
}

function select(state) {
  return {
    hash: state.routing.locationBeforeTransitions.hash
  }
}

export default connect(select)(cssModules(Product, styles))

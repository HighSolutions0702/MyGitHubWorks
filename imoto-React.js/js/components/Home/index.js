import React, { Component } from 'react'
import Services from 'components/Home/Services'
import PlaceOrder from 'components/Home/PlaceOrder'
import FeedbacksContainer from 'components/Home/FeedbacksContainer'
import SliderWrapper from 'components/Home/SliderWrapper'
import MobileApp from 'components/Home/MobileApp'
import Layout from 'components/shared/Layout'
import cssModules from 'react-css-modules'
import styles from 'components/Home/index.pcss'

class Home extends Component {
  render() {
    return (
      <Layout>
        <SliderWrapper />
        <Services />
        <PlaceOrder />
        <FeedbacksContainer />
        <MobileApp />
      </Layout>
    )
  }
}

export default cssModules(Home, styles)

import React, { Component } from 'react'
import { StickyContainer, Sticky } from 'react-sticky'
import { Element }  from 'react-scroll'
import { connect } from 'react-redux'
import cssModules from 'react-css-modules'
import { virtualTourScroll } from 'utils/helpers'
import styles from 'components/VirtualTour/index.pcss'
import VirtualTourHeader from './VirtualTourHeader'
import Navigation from './Navigation'
import PropertyDetails from './PropertyDetails'
import PhotoShoot from './PhotoShoot'
import FloorPlans from './FloorPlans'
import VideoActive from './VideoActive'
import MapContainer from './MapContainer'
import AgentInfo from './AgentInfo'

class VirtualTour extends Component {
  componentDidMount() {
    const { hash } = this.props
    const blockName = hash.split('#/')[1]
    const scrollFunction = () => { virtualTourScroll(blockName) }

    if (hash) {
      setTimeout(scrollFunction, 400)
    }
  }
  render() {
    const { videos, videoBackground, plans, order } = this.props
    return (
      <div styleName="wrapper">
        <VirtualTourHeader
          order={order}
        />
        <Element name="virtualtour-navigation" />
        <StickyContainer>
          <Sticky>
            {
              ({ isSticky, wasSticky, style, distanceFromTop, distanceFromBottom, calculatedHeight }) => (
                <Navigation style={style} />
                )
          }
          </Sticky>
          <Element name="virtualtour-details">
            <PropertyDetails
              order={order}
            />
          </Element>
          <Element name="virtualtour-photo">
            <PhotoShoot />
          </Element>
          <Element name="virtualtour-plan">
            <FloorPlans
              order={order}
              images={plans}
            />
          </Element>
          {videos &&
            <Element name="virtualtour-video">
              <VideoActive videos={videos} background={videoBackground} />
            </Element>
          }
          <Element name="virtualtour-map" >
            <MapContainer
              center={{ lat: 34.0522342, lng: -118.2436849 }}
              zoom={9}
              order={order}
            />
          </Element>
          <Element name="virtualtour-agent">
            <AgentInfo
              order={order}
            />
          </Element>
        </StickyContainer>
      </div>
    )
  }
}

function select(state) {
  return {
    hash: state.routing.locationBeforeTransitions.hash
  }
}

export default connect(select)(cssModules(VirtualTour, styles))

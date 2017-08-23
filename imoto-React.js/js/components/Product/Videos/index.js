import React, { Component } from 'react'
import VideoWrapper from 'components/Product/Videos/VideoWrapper'
import cssModules from 'react-css-modules'
import styles from 'components/Product/index.pcss'
import UnorderedList from 'components/shared/UnorderedList'
import Button from 'components/shared/Button'

const videoItems = [
  'Featured on IMOTO’s Youtube page',
  'MOV file',
  '2-3 Minute Length',
  '24 Hour Turnaround',
  'Online Download'
]

class Videos extends Component {
  render() {
    return (
      <div className="root">
        <div styleName="wrapper videos">
          <div styleName="section-name">
            VIDEOS
          </div>
          <div styleName="section-header">
            The IMOTO Video Tour is a full motion,
            professionally filmed and edited video tour.
          </div>
          <VideoWrapper width="100%" height="100%" webmName="1.webm" mp4Name="1.mp4" />
          <div styleName="product-text-wrapper">
            <div styleName="section-description">
              The
              <span styleName="imoto"> IMOTO </span>
              video is specifically designed to take
              viewers on a tour of your listing,
              highlighting unique features and details
              of the property.
            </div>
            <div styleName="paragraph">
              The
              <span styleName="imoto"> IMOTO </span>
              video is modern and innovative,
              capitalizing on quick, yet informative
              shots that keep viewers captivated
              throughout the whole film.
            </div>
            <div styleName="paragraph">
              This “virtual open house” a great tool
              for busy agents who would like to generate
              maximum online views and expose their
              listing to potential buyers 24/7.
            </div>
            <div styleName="list-header">
                All of our videos come with the following items for
              <span styleName="free"> FREE</span>
            </div>
            <UnorderedList
              items={videoItems}
              dot="url(/images/icons/check-blue.png)"
            />
          </div>
          <div styleName="section-link">
            Prices From $250
            <Button styleName="order-button">
              PLACE ORDER
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default cssModules(Videos, styles, { allowMultiple: true })

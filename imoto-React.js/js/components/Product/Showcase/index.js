import React, { Component } from 'react'
import VideoWrapper from 'components/Product/Videos/VideoWrapper'
import cssModules from 'react-css-modules'
import styles from 'components/Product/index.pcss'
import UnorderedList from 'components/shared/UnorderedList'

class Showcase extends Component {
  render() {
    const showcaseItems = [
      '24 Hour Turnaround',
      'Online Download'
    ]
    return (
      <div className="root">
        <div styleName="wrapper showcase">
          <div styleName="section-name">
            3D SHOWCASE
          </div>
          <div styleName="section-header">
            IMOTO’s 3D Showcase produces a complete
            three-dimensional representation of space!
          </div>
          <VideoWrapper
            width="100%"
            height="100%"
            webmName="1.webm"
            mp4Name="1.mp4"
          />
          <div styleName="product-text-wrapper">
            <div styleName="section-description">
              The 3D Showcase allows you to “walk”
              through a listing as if you were
              actually in the home.
            </div>
            <div styleName="paragraph">
              Not only is this product guaranteed to
              impress your clients, but it will grab
              buyers attention and give them an
              unprecedented amount of listing
              information... without ever stepping
              into the home! This is perfect for
              capturing the attention of out-of-town
              buyers or buyers who are simply too busy
              to tour the listing in person.
            </div>
            <div styleName="list-header">
              <span>All of our 3D Showcases come with the following items for</span>
              <span styleName="free"> FREE</span>
            </div>
            <UnorderedList
              items={showcaseItems}
              dot="url(/images/icons/check-blue.png)"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default cssModules(Showcase, styles, { allowMultiple: true })

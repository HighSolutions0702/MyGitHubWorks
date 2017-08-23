import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import { Carousel } from 'react-responsive-carousel'
import Slider from 'react-slick'
import VideoSlider from 'components/VirtualTour/VideoActive/VideoSlider'
import VideoItem from 'components/VirtualTour/VideoActive/VideoItem'
import styles from 'components/VirtualTour/VideoActive/index.pcss'
import { imagePath } from 'utils/helpers'

class VideoActive extends Component {
  render() {
    const { videos, background } = this.props
    const settings = {
      dots: true
    }


    return (
      <div styleName="videoContent" style={{ backgroundImage: `url(${background})` }} >
        <div styleName="shadowContent">
          <VideoSlider videos={videos} />
        </div>
      </div>
    )
    // return (
    //  <div styleName="videoContent" style={{ backgroundImage: `url(${background})` }} >
    //    <div styleName="shadowContent">
    //      <Slider {...settings}>
    //        {videos.map((videoId) =>
    //          <div>
    //            <VideoItem videoId={videoId} />
    //          </div>
    //        )}
    //      </Slider>
    //    </div>
    //  </div>
    // )
  }
}

export default cssModules(VideoActive, styles)

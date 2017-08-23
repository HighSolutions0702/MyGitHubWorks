import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import VideoItem from 'components/VirtualTour/VideoActive/VideoItem'
import styles from 'components/VirtualTour/VideoActive/VideoSlider/index.pcss'
import { imagePath } from 'utils/helpers'

class VideoSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 0
    }
    this.handleActive = this.handleActive.bind(this)
  }
  handleActive(active) {
    this.setState({
      active
    })
  }
  render() {
    const { videos } = this.props
    return (
      <div styleName="videoSlider">
        <VideoItem videoId={videos[this.state.active]} />
        <span styleName="showCount" >Video: {this.state.active + 1} of {videos.length} </span>
        {this.state.active > 0 &&
          <button styleName="prev"><img role="presentation" src={imagePath('left-arrow.svg')} onClick={() => { this.handleActive(this.state.active - 1) }} /></button>
        }
        {this.state.active < (videos.length - 1) &&
          <button styleName="next"><img role="presentation" src={imagePath('right-arrow.svg')} onClick={() => { this.handleActive(this.state.active + 1) }} /></button>
        }
      </div>
    )
  }
}

export default cssModules(VideoSlider, styles)

import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from 'components/Product/Videos/VideoWrapper/index.pcss'
import { videoPath, imagePath } from 'utils/helpers'

class VideoWrapper extends Component {
  constructor() {
    super()
    this.handlePlayButton = this.handlePlayButton.bind(this)
    this.state = {
      playVideo: false
    }
  }

  handlePlayButton() {
    const { playVideo } = this.state
    if (!playVideo) {
      this.setState({ playVideo: true })
      this.refs.myvideo.play()
    } else {
      this.setState({ playVideo: false })
      this.refs.myvideo.pause()
    }
  }

  render() {
    const { width, height, webmName, mp4Name } = this.props
    const { playVideo } = this.state
    return (
      <div styleName="main">
        <video
          onClick={this.handlePlayButton}
          width={width}
          height={height}
          ref="myvideo"
          styleName="video"
        >
          <source src={videoPath(webmName)} type="video/webm" />
          <source src={videoPath(mp4Name)} type="video/mp4" />
        </video>
        <div onClick={this.handlePlayButton} styleName="action-button">
          <img role="presentation" src={playVideo ? null : imagePath('/play-button.png')} />
        </div>
      </div>
    )
  }
}

export default cssModules(VideoWrapper, styles)

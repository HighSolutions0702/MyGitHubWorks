import React, { Component } from 'react'
import YouTube from 'react-youtube'

class VideoItem extends Component {
  constructor(props) {
    super(props)
    this._onReady = this._onReady.bind(this)
  }
  _onReady(event) {
    event.target.pauseVideo()
  }

  render() {
    const { videoId } = this.props
    const options = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 0
      }
    }
    return (
      <YouTube
        videoId={videoId}
        opts={options}
        onReady={this._onReady}
      />
    )
  }
}

export default VideoItem

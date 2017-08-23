import React, { Component } from 'react'
import Photo from 'components/OrderUpload/VirtualTwilight/Photo'
import cssModules from 'react-css-modules'
import styles from '../../index.pcss'

class TwilightLine extends Component {
  render() {
    const { photos, product } = this.props
    return (
      <div styleName="twilight-line">
        {photos && photos.map((photo) => <Photo photo={photo} product={product} />)}
      </div>
    )
  }
}
export default cssModules(TwilightLine, styles)


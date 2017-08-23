import React, { Component } from 'react'
import Photo from 'components/OrderUpload/VirtualStaging/Photo'
import cssModules from 'react-css-modules'
import styles from '../../index.pcss'

class StagingLine extends Component {
  render() {
    const { photos, product } = this.props
    return (
      <div styleName="staging-photo-line">
        {photos && photos.map((photo) => <Photo photo={photo} product={product} />)}
      </div>
    )
  }
}

export default cssModules(StagingLine, styles)

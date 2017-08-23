import React, { Component } from 'react'
import Photo from 'components/OrderUpload/PhotoShoot/Photo'
import cssModules from 'react-css-modules'
import styles from '../../index.pcss'

class PhotoLine extends Component {
  render() {
    const { photos, product } = this.props
    return (
      <div styleName="photo-line">
        {photos && photos.map((photo) => <Photo photo={photo} product />)}
      </div>
    )
  }
}
export default cssModules(PhotoLine, styles)

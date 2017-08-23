import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import PhotoGallery from 'components/VirtualTour/PhotoShoot/Gallery'
import styles from 'components/VirtualTour/PhotoShoot/index.pcss'
import { imagePath } from 'utils/helpers'

class PhotoShoot extends Component {
  render() {
    const images = [
      {
        src: imagePath('bg-1.jpg'),
        description: 'hello world image',
        itemWidth: '25%',
        itemHeight: '25vw'
      }, {
        src: imagePath('photo-shoot/room-3.png'),
        description: 'hello world image',
        itemWidth: '50%',
        itemHeight: '50vw'
      }, {
        src: imagePath('photo-shoot/room-2.png'),
        description: 'hello world image',
        itemWidth: '25%',
        itemHeight: '25vw'
      }, {
        src: imagePath('photo-shoot/room-3.png'),
        description: 'hello world image',
        itemWidth: '25%',
        itemHeight: '25vw'
      }, {
        src: imagePath('photo-shoot/room-1.png'),
        description: 'hello world image',
        itemWidth: '25%',
        itemHeight: '25vw'
      }, {
        src: imagePath('photo-shoot/room-1.png'),
        description: 'hello world image',
        itemWidth: '50%',
        itemHeight: '25vw'
      }, {
        src: imagePath('photo-shoot/room-3.png'),
        description: 'hello world image',
        itemWidth: '50%',
        itemHeight: '25vw'
      }
    ]
    return (
      <div styleName="wrapper">
        <div styleName="content">
          <div styleName="header">
            PHOTO SHOOT
          </div>

          <PhotoGallery items={images} />
        </div>
      </div>
    )
  }
}

export default cssModules(PhotoShoot, styles)

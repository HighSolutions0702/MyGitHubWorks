import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from 'components/VirtualTour/PhotoShoot/Gallery/GalleryItem/index.pcss'
import { imagePath } from 'utils/helpers'

class GalleryItem extends Component {
  render() {
    const { src, description, itemWidth, itemHeight, itemIndex, toggleBox } = this.props
    const style = {
      width: itemWidth,
      height: itemHeight,
      backgroundImage: `url(${src})`
    }
    return (
      <div style={style} styleName="galleryItem" >
        <div styleName="toggle" onClick={() => { toggleBox(itemIndex) }}>
          <img styleName="hoverShow" src={imagePath('zoom-white.png')} role="presentation" />
        </div>
      </div>
    )
  }

}

export default cssModules(GalleryItem, styles)

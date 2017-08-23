import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from 'components/VirtualTour/PhotoShoot/Gallery/index.pcss'
import GalleryItem from 'components/VirtualTour/PhotoShoot/Gallery/GalleryItem'
import Masonry from 'react-masonry-component'
import { imagePath } from 'utils/helpers'

class PhotoGallery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showBox: false,
      active: 0
    }
    this.handleToggleBox = this.handleToggleBox.bind(this)
    this.handleImage = this.handleImage.bind(this)
  }

  handleToggleBox(index = 0) {
    this.setState({
      showBox: !this.state.showBox,
      active: index
    })
  }
  handleImage(index) {
    this.setState({
      active: index
    })
  }
  render() {
    const { items } = this.props
    const options = {
      transitionDuration: 100
    }

    const galleryItems = items.map((item, index) =>
      <GalleryItem
        src={item.src}
        description={item.description}
        itemWidth={item.itemWidth}
        itemHeight={item.itemHeight}
        toggleBox={this.handleToggleBox}
        itemIndex={index}
      />
    )
    return (
      <div styleName="gallery">
        <Masonry
          className={'my-gallery-class'} // default ''
          styleName={'masonryGallery'}
          elementType={'div'} // default 'div'
          options={options} // default {}
          disableImagesLoaded={false} // default false
          updateOnEachImageLoad={false}
        >
          {galleryItems}
        </Masonry>
        {this.state.showBox &&

        <div styleName="box">
          <div styleName="overlay" onClick={() => { this.handleToggleBox(0) }} />
          <img styleName="closeButton" src={imagePath('icons/close-white.png')} role="presentation" onClick={() => { this.handleToggleBox(0) }} />
          <img src={items[this.state.active].src} alt={items[this.state.active].src} />
          {(this.state.active > 0) &&
            <button styleName="prevChangeSlide" onClick={() => { this.handleImage(this.state.active - 1) }}>
              <img src={imagePath('left-arrow.svg')} role="presentation" />
            </button>
          }
          {this.state.active < (items.length - 1) &&
            <button styleName="nextChangeSlide" onClick={() => { this.handleImage(this.state.active + 1) }}>
              <img src={imagePath('right-arrow.svg')} role="presentation" />
            </button>
          }
        </div>
        }
      </div>
    )
  }
}

export default cssModules(PhotoGallery, styles)

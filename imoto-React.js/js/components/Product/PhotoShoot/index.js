import React, { Component } from 'react'
import ImageGallery from 'components/Product/PhotoShoot/ImageGallery'
import cssModules from 'react-css-modules'
import styles from 'components/Product/index.pcss'
import UnorderedList from 'components/shared/UnorderedList'

const images = [
  '/images/img-1.png',
  '/images/img-2.png'
]
const photosQualities = [
  'Sell listings 50% faster;',
  'Sell listings 39% closer to list price;',
  'Generate 118% more online listing views.'
]
const photoItems = [
  'Two virtual tours (branded and unbranded)',
  'An aerial shot with a 30ft tripod',
  'HDR editing',
  'Blue sky',
  '24 hour turnaround (Guaranteed!)',
  '12 months of cloud storage',
  'Easy online ordering and billing'
]

class PhotoShoot extends Component {
  render() {
    return (
      <div className="root">
        <div styleName="wrapper photo-shoot">
          <span styleName="section-name">
            PHOTO SHOOT
          </span>
          <div styleName="section-header">
            <span styleName="photo-shoot-header">
              IMOTO’s professional photography is the best on the market.
            </span>
          </div>
          <ImageGallery images={images} />
          <div styleName="product-text-wrapper">
            <div styleName="section-description">
              With skillfully trained real estate photographers
              and a high quality HDR editing system,
              <span styleName="imoto"> IMOTO’s </span>
              products are guaranteed to get you results.
            </div>
            <div styleName="list-header-imoto">
              <span styleName="imoto"> IMOTO’s </span>
              photos are statistically proven to:
            </div>
            <UnorderedList items={photosQualities} />
            <div styleName="paragraph">
              Not only is
              <span styleName="imoto"> IMOTO’s </span>
              photography extremely effective, but
              it is also convenient and affordable.
            </div>
            <div styleName="list-header">
              All of our photo shoots come with the following items for
              <span styleName="free"> FREE</span>
            </div>
            <UnorderedList
              items={photoItems}
              dot="url(/images/icons/check-blue.png)"
            />
          </div>
          <div styleName="select-state">
            Select State to View Prices
          </div>
        </div>
      </div>
    )
  }
}

export default cssModules(PhotoShoot, styles, { allowMultiple: true })

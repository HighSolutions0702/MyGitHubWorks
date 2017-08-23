import React, { Component, cloneElement } from 'react'
import { graphql } from 'react-apollo'
import { queries } from 'apollo'
import { imagePath } from 'utils/helpers'
import { Link } from 'react-router'
import Button from 'components/shared/Button'
import Layout from 'components/shared/Layout'
import cssModules from 'react-css-modules'
import styles from './index.pcss'

class OrderUploadReview extends Component {
  render() {
    const { child, path, data: { customer, refetch } } = this.props

    return (
      <Layout>
        <div styleName="order-upload-wrapper">
          <div className="root">

            <div styleName="row">
              <div styleName="content">


                <div styleName="header-block-wrapper">
                  <div styleName="header-block">
                    <div styleName="page-number">2</div>
                    <div styleName="header-text">
                      <div><span styleName="link-text">Order # 27001</span> 325 Evergreen Lane, News Orleans, LA 78010</div>
                      <span styleName="sub-text">You can edit each field for each service order.</span>
                    </div>
                  </div>
                  <div styleName="button-right">
                    <Button
                      size="xsmall"
                      type="button"
                      color="white-gray"
                    >
                          Need help?
                      </Button>
                  </div>
                </div>

                <div styleName="block">
                  <div styleName="wrapper-head-container">
                    <div styleName="name-wrap">
                      <div styleName="name">YOUR LOCATION</div>
                      <div>St, Phoenix, AZ 85006, Phoenix, AZ 85028</div>
                    </div>
                  </div>
                  <div styleName="wrapper-head-container">
                    <div styleName="name-wrap">
                      <div styleName="name">ITEM</div>
                      <div>Photo Shoot:</div>
                    </div>
                    <div styleName="button-container">
                      <Button
                        size="xsmall"
                        type="button"
                        color="white-gray"
                      >
                          EDIT
                      </Button>
                    </div>
                    <div styleName="clear" />
                  </div>
                  <div styleName="block-content">

                    <div styleName="photo-block">
                      <div styleName="photo-img-wrap">
                        <img src={imagePath('services/1.png')} alt="" styleName="photo-img" />
                      </div>
                      <div styleName="photo-img-wrap">
                        <img src={imagePath('services/1.png')} alt="" styleName="photo-img" />
                      </div>
                      <div styleName="photo-img-wrap">
                        <img src={imagePath('services/1.png')} alt="" styleName="photo-img" />
                      </div>
                      <div styleName="photo-img-wrap">
                        <img src={imagePath('services/1.png')} alt="" styleName="photo-img" />
                      </div>
                      <div styleName="photo-img-wrap">
                        <img src={imagePath('services/1.png')} alt="" styleName="photo-img" />
                      </div>
                      <div styleName="photo-img-wrap">
                        <img src={imagePath('services/1.png')} alt="" styleName="photo-img" />
                      </div>
                      <div styleName="photo-img-wrap">
                        <img src={imagePath('services/1.png')} alt="" styleName="photo-img" />
                      </div>
                      <div styleName="photo-img-wrap">
                        <img src={imagePath('services/1.png')} alt="" styleName="photo-img" />
                      </div>
                      <div styleName="photo-img-wrap">
                        <img src={imagePath('services/1.png')} alt="" styleName="photo-img" />
                      </div>
                      <div styleName="photo-img-wrap">
                        <img src={imagePath('services/1.png')} alt="" styleName="photo-img" />
                      </div>
                      <div styleName="photo-img-wrap">
                        <img src={imagePath('services/1.png')} alt="" styleName="photo-img" />
                      </div>
                      <div styleName="photo-img-wrap">
                        <img src={imagePath('services/1.png')} alt="" styleName="photo-img" />
                      </div>
                      <div styleName="photo-img-wrap">
                        <img src={imagePath('services/1.png')} alt="" styleName="photo-img" />
                      </div>
                      <div styleName="photo-img-wrap">
                        <img src={imagePath('services/1.png')} alt="" styleName="photo-img" />
                      </div>
                      <div styleName="photo-img-wrap">
                        <img src={imagePath('services/1.png')} alt="" styleName="photo-img" />
                      </div>
                    </div>

                    <div styleName="total-wrap">
                      <div styleName="total-img-wrap">
                        <img src={imagePath('icons/archive_arrow_down.png')} alt="" />
                      </div>
                      <div styleName="total-txt-wrap">
                        <div styleName="total-name">Total files Uploaded</div>
                        <div styleName="total-subtext-wrap">
                          <span styleName="total-subtext-bold">Photos by a session: </span>
                          <span styleName="total-subtext-regular">25 photos</span>
                          <div styleName="total-dots">
                            <img src={imagePath('icons/dark-dot.png')} alt="" />
                            <img src={imagePath('icons/dark-dot.png')} alt="" />
                            <img src={imagePath('icons/dark-dot.png')} alt="" />
                          </div>
                          <span styleName="total-subtext-bold">They needed photos: </span>
                          <span styleName="total-subtext-regular">75 photos</span>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div styleName="wrapper-head-container">
                    <div styleName="name-wrap">
                      <div styleName="name">ITEM</div>
                      <div>Virtual Twilight</div>
                    </div>
                    <div styleName="button-container">
                      <Button
                        size="xsmall"
                        type="button"
                        color="white-gray"
                      >
                          EDIT
                      </Button>
                    </div>
                    <div styleName="clear" />
                  </div>
                  <div styleName="block-content">
                    <div styleName="name-margin">FILE NAME LIST</div>
                    <div styleName="list-item-wrap">
                      <div>PHOTO-1.PNG</div>
                      <div styleName="sub-text">Outside of the house</div>
                    </div>
                    <div styleName="list-item-wrap">
                      <div>PHOTO-2.PNG</div>
                      <div styleName="sub-text">Outside of the house</div>
                    </div>
                    <div styleName="list-item-wrap">
                      <div>PHOTO-3.PNG</div>
                      <div styleName="sub-text">Outside of the house</div>
                    </div>
                    <div styleName="list-item-wrap">
                      <div>PHOTO-4.PNG</div>
                      <div styleName="sub-text">Outside of the house</div>
                    </div>
                    <div styleName="list-item-wrap">
                      <div>PHOTO-5.PNG</div>
                      <div styleName="sub-text">Outside of the house</div>
                    </div>
                  </div>


                  <div styleName="wrapper-head-container">
                    <div styleName="name-wrap">
                      <div styleName="name">ITEM</div>
                      <div>Virtual Staging</div>
                    </div>
                    <div styleName="button-container">
                      <Button
                        size="xsmall"
                        type="button"
                        color="white-gray"
                      >
                          EDIT
                      </Button>
                    </div>
                    <div styleName="clear" />
                  </div>
                  <div styleName="block-content">
                    <div styleName="half-wrap-left">
                      <div styleName="name-margin">FILE NAME LIST</div>
                      <div styleName="list-item-wrap">
                        <div styleName="review-regular-txt">PHOTO-1.PNG</div>
                        <div styleName="sub-text">Outside of the house</div>
                      </div>
                      <div styleName="list-item-wrap">
                        <div styleName="review-regular-txt">PHOTO-2.PNG</div>
                        <div styleName="sub-text">Outside of the house</div>
                      </div>
                      <div styleName="list-item-wrap">
                        <div styleName="review-regular-txt">PHOTO-3.PNG</div>
                        <div styleName="sub-text">Outside of the house</div>
                      </div>
                      <div styleName="list-item-wrap">
                        <div styleName="review-regular-txt">PHOTO-4.PNG</div>
                        <div styleName="sub-text">Outside of the house</div>
                      </div>
                      <div styleName="list-item-wrap">
                        <div styleName="review-regular-txt">PHOTO-5.PNG</div>
                        <div styleName="sub-text">Outside of the house</div>
                      </div>
                    </div>
                    <div styleName="half-wrap-right">
                      <div styleName="desc-item-wrap">
                        <div styleName="name-margin">SELECT STYLE</div>
                        <div styleName="review-regular-txt">STYLE 1</div>
                      </div>
                      <div styleName="desc-item-wrap">
                        <div styleName="name-margin">ADD NOTES</div>
                        <div styleName="review-regular-txt">DESCRIPTION NOTE</div>
                      </div>
                    </div>
                  </div>
                  <div styleName="wrapper-head-container">
                    <div styleName="name-wrap">
                      <div styleName="name">ITEM</div>
                      <div>Virtual Video</div>
                    </div>
                    <div styleName="button-container">
                      <Button
                        size="xsmall"
                        type="button"
                        color="white-gray"
                      >
                          EDIT
                      </Button>
                    </div>
                    <div styleName="clear" />
                  </div>
                  <div styleName="block-content">
                    <div styleName="half-wrap-left">
                      <div styleName="name-margin">FILE VIDEO</div>
                      <div styleName="video-wrap">
                        <img src={imagePath('services/1.png')} alt="" styleName="video-img" />
                        <img src={imagePath('icons/Play.png')} alt="" styleName="playbutton-img" />
                      </div>
                    </div>
                    <div styleName="half-wrap-right">
                      <div styleName="desc-item-wrap">
                        <div styleName="name-margin">MAIN TITLE</div>
                        <div styleName="review-regular-txt">NAME FILE VIDEO</div>
                      </div>
                      <div styleName="desc-item-wrap">
                        <div styleName="name-margin">BEDS</div>
                        <div styleName="review-regular-txt">3.5</div>
                      </div>
                      <div styleName="desc-item-wrap">
                        <div styleName="name-margin">BATHS</div>
                        <div styleName="review-regular-txt">3.5</div>
                      </div>
                      <div styleName="desc-item-wrap">
                        <div styleName="name-margin">SQUARE FOOTAGE</div>
                        <div styleName="review-regular-txt">2750</div>
                      </div>
                      <div styleName="desc-item-wrap">
                        <div styleName="name-margin">LISTING PRICE</div>
                        <div styleName="review-regular-txt">$475.995</div>
                      </div>
                      <div styleName="desc-item-wrap">
                        <div styleName="name-margin">EXTRA FEATURES</div>
                        <div styleName="review-regular-txt">FEATURE</div>
                      </div>
                    </div>
                  </div>
                  <div styleName="wrapper-head-container">
                    <div styleName="name-wrap">
                      <div styleName="name">ITEM</div>
                      <div>LISTING TEASER</div>
                    </div>
                    <div styleName="button-container">
                      <Button
                        size="xsmall"
                        type="button"
                        color="white-gray"
                      >
                          EDIT
                      </Button>
                    </div>
                    <div styleName="clear" />
                  </div>
                  <div styleName="block-content">
                    <div styleName="desc-item-wrap">
                      <div styleName="name-margin">MAIN TITLE</div>
                      <div styleName="review-regular-txt">NAME FILE VIDEO</div>
                    </div>
                    <div styleName="desc-item-wrap">
                      <div styleName="name-margin">BEDS</div>
                      <div styleName="review-regular-txt">3.5</div>
                    </div>
                    <div styleName="desc-item-wrap">
                      <div styleName="name-margin">BATHS</div>
                      <div styleName="review-regular-txt">3.5</div>
                    </div>
                    <div styleName="desc-item-wrap">
                      <div styleName="name-margin">SQUARE FOOTAGE</div>
                      <div styleName="review-regular-txt">2750</div>
                    </div>
                    <div styleName="desc-item-wrap">
                      <div styleName="name-margin">LISTING PRICE</div>
                      <div styleName="review-regular-txt">$475.995</div>
                    </div>
                    <div styleName="desc-item-wrap">
                      <div styleName="name-margin">EXTRA FEATURES</div>
                      <div styleName="review-regular-txt">FEATURE</div>
                    </div>
                  </div>
                </div>
                <div styleName="buttons-container">
                  <div styleName="button-left">
                    <Link
                      to="/upload-order"
                    >
                      <Button
                        size="xlarge"
                        type="button"
                        color="white-gray"
                        styleName="upload-button"
                      >
                                GO BACK
                        </Button>
                    </Link>
                  </div>
                  <div styleName="button-right">
                    <Button
                      size="xlarge"
                      type="button"
                      color="white-orange2"
                      styleName="upload-button"
                    >
                              READY FOR PROCESSING
                      </Button>
                  </div>
                  <div styleName="clear" />
                </div>

              </div>

            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default graphql(
  queries.getCustomer, {
    options: {
      forceFetch: true,
      ssr: false
    }
  }
)(cssModules(OrderUploadReview, styles))

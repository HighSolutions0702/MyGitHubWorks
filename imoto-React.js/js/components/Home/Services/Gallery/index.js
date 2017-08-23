import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from 'components/Home/Services/Gallery/index.pcss'
import PlaceOrderButtonContainer from 'components/shared/PlaceOrderButtonContainer'
import LearnMoreButtonContainer from 'components/shared/LearnMoreButtonContainer'
import { imagePath } from 'utils/helpers'

class Gallery extends Component {
  render() {
    return (
      <div styleName="wrapper">
        <div styleName="column">
          <div
            styleName="img-container"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <div>
              <img src={imagePath('services/1.png')} alt="logo" />
            </div>
            <div styleName="icon-container">
              <img src={imagePath('icons/photo.svg')} alt="logo" />
              <span styleName="description">
                Photography
              </span>
            </div>
            <div styleName="icon-bg" />
            <div styleName="content">
              <div styleName="buttons">
                <div styleName="learn-more-button">
                  <LearnMoreButtonContainer />
                </div>
                <div>
                  <PlaceOrderButtonContainer />
                </div>
              </div>
            </div>
          </div>
          <div
            styleName="img-container"
            data-aos="fade-up"
            data-aos-delay="1000"
          >
            <div>
              <img src={imagePath('services/2.png')} alt="logo" />
            </div>
            <div styleName="icon-container">
              <img src={imagePath('icons/virtual.svg')} alt="logo" />
              <span styleName="description">
                Virtual Staging
              </span>
            </div>
            <div styleName="icon-bg" />
            <div styleName="content">
              <div styleName="buttons">
                <div styleName="learn-more-button">
                  <LearnMoreButtonContainer />
                </div>
                <div>
                  <PlaceOrderButtonContainer />
                </div>
              </div>
            </div>
          </div>
          <div
            styleName="img-container"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            <div>
              <img src={imagePath('services/3.png')} alt="logo" />
            </div>
            <div styleName="icon-container">
              <img src={imagePath('icons/videos.svg')} alt="logo" />
              <span styleName="description">
                Videos
              </span>
            </div>
            <div styleName="icon-bg" />
            <div styleName="content">
              <div styleName="buttons">
                <div styleName="learn-more-button">
                  <LearnMoreButtonContainer />
                </div>
                <div>
                  <PlaceOrderButtonContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div styleName="column">
          <div
            styleName="img-container"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            <div>
              <img src={imagePath('services/4.png')} alt="logo" />
            </div>
            <div styleName="icon-container">
              <img src={imagePath('icons/twilight.svg')} alt="logo" />
              <span styleName="description">
                Twilight Photography
              </span>
            </div>
            <div styleName="icon-bg" />
            <div styleName="content">
              <div styleName="buttons">
                <div styleName="learn-more-button">
                  <LearnMoreButtonContainer />
                </div>
                <div>
                  <PlaceOrderButtonContainer />
                </div>
              </div>
            </div>
          </div>
          <div
            styleName="img-container"
            data-aos="fade-up"
            data-aos-delay="1100"
          >
            <div>
              <img src={imagePath('services/5.png')} alt="logo" />
            </div>
            <div styleName="icon-container">
              <img src={imagePath('icons/floor.svg')} alt="logo" />
              <span styleName="description">
                Floor Plans
              </span>
            </div>
            <div styleName="icon-bg" />
            <div styleName="content">
              <div styleName="buttons">
                <div styleName="learn-more-button">
                  <LearnMoreButtonContainer />
                </div>
                <div>
                  <PlaceOrderButtonContainer />
                </div>
              </div>
            </div>
          </div>
          <div
            styleName="img-container"
            data-aos="fade-up"
            data-aos-delay="500"
            data-aos-offset="400"
          >
            <div>
              <img src={imagePath('services/6.png')} alt="logo" />
            </div>
            <div styleName="icon-container">
              <img src={imagePath('icons/3d.svg')} alt="logo" />
              <span styleName="description">
                3D Showcases
              </span>
            </div>
            <div styleName="icon-bg" />
            <div styleName="content">
              <div styleName="buttons">
                <div styleName="learn-more-button">
                  <LearnMoreButtonContainer />
                </div>
                <div>
                  <PlaceOrderButtonContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default cssModules(Gallery, styles)

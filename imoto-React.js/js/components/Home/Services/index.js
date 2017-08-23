import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from 'components/Home/Services/index.pcss'
import Gallery from 'components/Home/Services/Gallery'
import Stats from 'components/Home/Services/Stats'
import { imagePath } from 'utils/helpers'

class Services extends Component {
  render() {
    return (
      <div styleName="wrapper">
        <div className="root">
          <div
            styleName="head-section"
            data-aos="services"
          >
            <div styleName="bg">
              Services
            </div>
            <div styleName="header">
              Imoto Services
            </div>
            <div styleName="description">
              Choose from a list of services below
            </div>
            <div>
              <img src={imagePath('icons/rounds.svg')} alt="logo" />
            </div>
          </div>
          <Gallery />
          <div styleName="about">
            Curabitur euismod ultrices eros sit amet lobortis.
            Maecenas magna enim, dictum id ligula sit amet,
            vehicula vulputate tortor. Praesent ut tortor metus.
            Pellentesque accumsan magna ut elit posuere, quis
            malesuada massa.
          </div>
          <Stats />
        </div>
      </div>
    )
  }
}

export default cssModules(Services, styles)

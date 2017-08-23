import React, { Component } from 'react'
import Layout from 'components/shared/Layout'
import cssModules from 'react-css-modules'
import styles from 'components/About/index.pcss'
import QualitiesWrapper from 'components/About/QualitiesWrapper'
import { imagePath } from 'utils/helpers'

class About extends Component {
  render() {
    const items = [
      { header: 'Quality', icon: '/icons/about-icon.svg', description: 'IMOTO offers the highest quality HDR photography on the market. Our product quality is the backbone of our business, and through careful editing and intensive photographer training, we always deliver on our promise of quality.' },
      { header: 'Innovation', icon: '/icons/about-icon.svg', description: 'We strive to continually innovate our products and services to optimize the photography experience for our customers. Through programs like the IMOTO Insight Council, we utilize the thought leadership of our customers to remain on the forefront of technology and innovation.' },
      { header: 'Convenience', icon: '/icons/about-icon.svg', description: 'Our goal is to make our customers’ photography experience quick and painless. The IMOTO app, online ordering and payment system, easy­-to-­use website, online product storage, and excellent customer service all contribute to our optimized system that is designed to save real estate agents time and hassle.' },
      { header: 'Affordability', icon: '/icons/about-icon.svg', description: 'Our photo packages and add­-on products are designed to fit into the marketing budget for listings of all prices. We strive to provide our customers with a variety products and photo packages that showcase any home, without breaking the bank.' },
      { header: 'Impact', icon: '/icons/about-icon.svg', description: 'IMOTO’s photos are statistically proven to help sell listings 50% faster and 39% closer to list price. Additionally, our photos receive 118% more online views than standard listing photos. With results like these, we know you and your clients will be satisfied.' }
    ]
    return (
      <Layout>
        <div styleName="wrapper">
          <img src={imagePath('about-bg.png')} alt="about" />
          <div styleName="content">
            <div styleName="header">
              About IMOTO values
            </div>
            <div styleName="description">
              IMOTO photo is a real estate marketing
              services industry leader..
            </div>
          </div>
        </div>
        <QualitiesWrapper items={items} />
      </Layout>
    )
  }
}

export default cssModules(About, styles)

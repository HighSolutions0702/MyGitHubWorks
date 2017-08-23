import React, { Component } from 'react'
import { imagePath } from 'utils/helpers'
import { Link } from 'react-router'
import cssModules from 'react-css-modules'
import Button from 'components/shared/Button'
import styles from './index.pcss'

class PhotographerOrder extends Component {
  render() {
    const { order, name, avatar, location, products, uploadState } = this.props
    const uploadStyleName = `state-${uploadState}`
    let totalPrice = 0
    products.map((product) => (totalPrice += parseFloat(product.price)))
    return (
      <article styleName="item">
        <header>
          <img src={avatar} alt="example" styleName="header-pic" />
          <h4>{name} <button styleName="info">i</button></h4>
          <span styleName={uploadStyleName} >{uploadState.replace(/_/g, ' ')}</span>
        </header>
        <section styleName="information">
          <div styleName="maps">
            <h5>Your location</h5>
            <strong>{location}</strong>
          </div>
          <div styleName="pricing">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>QTY</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) =>
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>
                      ${parseFloat(product.price).toFixed(2)}
                    </td>
                  </tr>
                  )
                }
                <tr>
                  <td />
                  <td colSpan="2" style={{ textAlign: 'right' }}>TOTAL: ${totalPrice.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
            {uploadState === 'pending' &&
              <Link to={`/upload-order/${order}`} >
                <Button
                  size="xsmall"
                  type="button"
                  color="orange"
                >
                  START UPLOAD
                </Button>
              </Link>
            }
          </div>
        </section>
      </article>
    )
  }
}

export default cssModules(PhotographerOrder, styles)

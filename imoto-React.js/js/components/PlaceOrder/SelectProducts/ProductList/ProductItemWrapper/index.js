import React, { Component } from 'react'
import { connect } from 'react-redux'
import { initialize } from 'redux-form'
import R from 'ramda'
import Switch from 'components/shared/Switch'
import Tooltip from 'components/shared/Tooltip'
import cssModules from 'react-css-modules'
import types from 'constants/actionTypes'
import { createAttributeName } from 'utils/helpers'
import classNames from 'classnames'
import ProductContent from './ProductContent'
import styles from './index.pcss'

class ProductItem extends Component {
  constructor(props) {
    super(props)
    this.changeFormBlockStatus = this.changeFormBlockStatus.bind(this)
    this.removeAttributeFromForm = this.removeAttributeFromForm.bind(this)
    this.seeCatalog = this.seeCatalog.bind(this)
  }

  changeFormBlockStatus(value) {
    const {
      props: { dispatch, product }
    } = this
    if (!value) {
      dispatch({ type: types.REMOVE_PRODUCT_FROM_LIST, payload: product.id })
      product.attribute_items.forEach((item, index) => (
        this.removeAttributeFromForm(item)
      ))
    } else {
      dispatch({ type: types.ADD_PRODUCT_TO_LIST, payload: product })
    }
  }

  removeAttributeFromForm(attr) {
    const { form, dispatch } = this.props
    const values = form['order-select-products'].values
    const name = createAttributeName(attr)
    delete values[name]
    dispatch(initialize('order-select-products', values))
  }

  seeCatalog() {
    window.open('http://www.imotovirtualstaging.com/', 'Virtual Staging', 'width=1024,height=768,scrollbars=yes')
  }

  render() {
    const {
      order: {
        selectedProducts,
        orderSummary
      },
      product,
      leftColumn,
      rightColumn
    } = this.props
    const isProductSelected = selectedProducts.some(item => item.id === product.id)
    const currentStatObj = R.find(R.propEq('id', product.id))(orderSummary)
    const productCost = currentStatObj && currentStatObj.price

    return (
      <div
        styleName={
          classNames('product-wrapper', {
            'left-column': leftColumn,
            'right-column': rightColumn
          })
        }
      >
        <div styleName="product-header">
          {
            !isProductSelected ?
              <div styleName="product-title-disabled">
                <span>{ product.name }</span>
                <Tooltip text={product.description} />
              </div>
            :
              <div>
                <div styleName="product-info-wrapper">
                  <div styleName="product-image">
                    <img src={product.image} role="presentation" />
                  </div>
                  <div styleName="product-info">
                    <div styleName="product-title">
                      { product.name }
                      {product.name === 'Virtual Staging' &&
                        <span styleName="seeCatalog" onClick={this.seeCatalog} >See catalog</span>
                      }
                    </div>
                    <div styleName="product-cost">
                      { `$ ${productCost}` }
                    </div>
                  </div>
                  <Tooltip text={product.description} />
                </div>
              </div>
          }
          <div>
            <Switch
              value={isProductSelected}
              onChange={this.changeFormBlockStatus}
            />
          </div>
        </div>
        { isProductSelected && <ProductContent order={this.props.order} product={product} /> }
      </div>
    )
  }
}

function select(state) {
  return {
    order: state.placeOrder,
    form: state.form
  }
}

export default connect(select)(cssModules(ProductItem,
  styles, { allowMultiple: true }))

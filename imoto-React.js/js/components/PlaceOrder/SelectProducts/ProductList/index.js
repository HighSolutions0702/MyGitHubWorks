import React, { Component } from 'react'
import R from 'ramda'
import * as validations from 'utils/validationSchemas'
import * as normalize from 'utils/normalizeSchema'
import validate from 'validate.js'
import { reduxForm } from 'redux-form'
import cssModules from 'react-css-modules'
import types from 'constants/actionTypes'
import { connect } from 'react-redux'
import Button from 'components/shared/Button'
import { createAttributeName, countProductPrice, countProductQuantity, getProductAttributes } from 'utils/helpers'
import styles from './index.pcss'
import ProductItemWrapper from './ProductItemWrapper'

const validationSchema = {}

const formValidator = (values) => validate(values, validationSchema) || {}

class SelectProducts extends Component {
  constructor(props) {
    super(props)
    this.handleBackClick = this.handleBackClick.bind(this)
    this.createOrderSummaryObject = this.createOrderSummaryObject.bind(this)
    this.updateOrderSummaryPanel = this.updateOrderSummaryPanel.bind(this)
  }

  componentDidMount() {
    const { dispatch, order } = this.props
    if (!order.initialProductList) {
      dispatch({ type: types.GET_INITIAL_PRODUCTS_LIST_REQUEST })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { form, order: { selectedProducts, orderSummary } } = this.props
    const currentValues = form['order-select-products'].values
    const prevValues = prevProps.form['order-select-products'].values
    const currentSelectedProductsLength = selectedProducts.length
    const prevSelectedProductsLength = prevProps.order.selectedProducts.length
    const selectedProductsEquals = R.equals(currentSelectedProductsLength, prevSelectedProductsLength)
    const valuesEqual = R.equals(currentValues, prevValues)

    if (!valuesEqual || !selectedProductsEquals) {
      const orderSummaryObject = this.createOrderSummaryObject()
      this.updateOrderSummaryPanel(orderSummaryObject)
    }
  }

  updateOrderSummaryPanel(orderSummaryObject) {
    const { dispatch } = this.props
    dispatch({ type: types.SET_ORDER_SUMMARY, payload: orderSummaryObject })
  }

  createOrderSummaryObject() {
    const { form, order: { selectedProducts, orderSummary } } = this.props
    const setProductInfo = (item) => {
      const productId = item.id
      const attrItems = item.attribute_items
      const formValues = form['order-select-products'].values
      const currentProductAttributes = getProductAttributes(formValues, productId)
      const productPrice = countProductPrice(currentProductAttributes, attrItems)
      const productQuantity = countProductQuantity(currentProductAttributes, attrItems)

      return {
        name: item.name,
        qty: productQuantity,
        price: productPrice,
        id: productId
      }
    }
    const orderSummaryObject = selectedProducts.map((item, i) => setProductInfo(item))
    return orderSummaryObject
  }

  handleBackClick() {
    const { dispatch } = this.props
    dispatch({ type: types.CHANGE_PLACE_ORDER_ACTIVE_STEP, payload: 1 })
  }

  render() {
    const { order: { initialProductList, choosedList, selectedProducts }, orderSummary } = this.props
    const productList = choosedList || initialProductList
    const submit = (values, dispatch) => new Promise((resolve, reject) =>
      dispatch({
        type: types.SUBMIT_PRODUCT_LIST_REQUEST,
        payload: {
          values,
          resolve,
          reject
        }
      })
    ).then(() =>
      dispatch({
        type: types.GET_INITIAL_AVAILABLE_PHOTOGRAPHERS_REQUEST
      })
    ).catch(() => {})
    const { handleSubmit } = this.props

    return (
      <div>
        {
          productList ?
            <form onSubmit={handleSubmit(submit)}>
              <div styleName="product-list-wrapper">
                <div styleName="column">
                  {
                    productList.map((item, index) => (
                      index % 2 === 0 ? <ProductItemWrapper
                        key={index}
                        product={item}
                        leftColumn
                      /> : null
                    ))
                  }
                </div>
                <div styleName="column">
                  {
                    productList.map((item, index) => (
                      index % 2 === 0 ? null : <ProductItemWrapper
                        key={index}
                        product={item}
                        rightColumn
                      />
                    ))
                  }
                </div>
              </div>
              <div styleName="form-button-container">
                <Button
                  size="xsmall"
                  type="button"
                  color="white-gray"
                  onClick={this.handleBackClick}
                >
                  BACK
                </Button>
                <Button
                  size="xsmall"
                  type={selectedProducts.length ? 'submit' : 'button'}
                  color={selectedProducts.length ? 'white-orange' : 'white-gray'}
                >
                  CONTINUE
                </Button>
              </div>
            </form>
          : null
        }
      </div>
    )
  }
}

function select(state) {
  return {
    order: state.placeOrder,
    form: state.form,
    orderSummary: state.orderSummary
  }
}

export default reduxForm({
  form: 'order-select-products',
  validate: formValidator,
  destroyOnUnmount: false,
  initialValues: {
    startedField: true
  },
  enableReinitialize: false
})(connect(select)(cssModules(SelectProducts,
  styles, { allowMultiple: true })))

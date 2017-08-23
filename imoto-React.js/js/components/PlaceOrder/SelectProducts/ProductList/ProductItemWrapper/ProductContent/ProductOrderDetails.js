import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, initialize } from 'redux-form'
import { renderInput } from 'utils/fieldRenderers'
import cssModules from 'react-css-modules'
import styles from './index.pcss'

class ProductOrderDetails extends Component {
  componentDidMount() {
    const {
      attribute,
      form,
      dispatch,
      order: {
        listingDetails: {
          address,
          secondAddress,
          numberOfBeds,
          numberOfBaths,
          squareFootage
        }
      }
    } = this.props
    const data = attribute.data && JSON.parse(attribute.data)
    const values = form['order-select-products'].values
    values[`listing-address${attribute.id}`] = address
    values[`listing-beds${attribute.id}`] = `${numberOfBeds} beds`
    values[`listing-baths${attribute.id}`] = `${numberOfBaths} baths`
    values[`listing-footage${attribute.id}`] = `${squareFootage} sq/ft`
    dispatch(initialize('order-select-products', values))
  }

  render() {
    const { attribute } = this.props
    return (
      <div styleName="field-wrapper">
        <div styleName="address-block">
          <Field
            simpleInput
            fieldClassName="product-form-input product-input-disabled"
            name={`listing-address${attribute.id}`}
            component={renderInput}
            disabled
          />
        </div>
        <div styleName="description-block">
          <Field
            simpleInput
            name={`listing-beds${attribute.id}`}
            fieldClassName="product-form-input product-input-disabled"
            component={renderInput}
            disabled
          />
          <Field
            simpleInput
            fieldClassName="product-form-input product-input-disabled"
            name={`listing-baths${attribute.id}`}
            component={renderInput}
            disabled
          />
          <Field
            simpleInput
            fieldClassName="product-form-input product-input-disabled"
            name={`listing-footage${attribute.id}`}
            component={renderInput}
            disabled
          />
        </div>
      </div>
    )
  }
}

function select(state) {
  return {
    form: state.form,
    order: state.placeOrder
  }
}

export default connect(select)(cssModules(ProductOrderDetails,
  styles))

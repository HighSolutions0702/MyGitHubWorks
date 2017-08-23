import React, { Component } from 'react'
import { Field, initialize } from 'redux-form'
import * as normalize from 'utils/normalizeSchema'
import { connect } from 'react-redux'
import { renderInput } from 'utils/fieldRenderers'
import { createAttributeName } from 'utils/helpers'
import cssModules from 'react-css-modules'
import styles from './index.pcss'

class ProductInput extends Component {
  componentDidMount() {
    const { hidden, attribute, form, dispatch, order } = this.props
    const data = attribute.data && JSON.parse(attribute.data)
    const inputName = createAttributeName(attribute)
    const values = form['order-select-products'].values
    const squareFootage = order && order.listingDetails ? `${+order.listingDetails.squareFootage} sq/ft` : null
    values[inputName] = hidden ? 'hidden' : (squareFootage || values[inputName] || data.unit)
    dispatch(initialize('order-select-products', values, false))
  }

  render() {
    const { attribute, hidden } = this.props
    const inputName = createAttributeName(attribute)
    return (
      <div styleName="field-wrapper">
        <Field
          simpleInput
          fieldClassName="product-form-input"
          name={inputName}
          normalize={normalize.numberValue}
          component={renderInput}
          type={hidden ? 'hidden' : 'text'}
        />
      </div>
    )
  }
}

function select(state) {
  return {
    form: state.form
  }
}

export default connect(select)(cssModules(ProductInput, styles))

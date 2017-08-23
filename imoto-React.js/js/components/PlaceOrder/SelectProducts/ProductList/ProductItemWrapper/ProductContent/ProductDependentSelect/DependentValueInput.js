import React, { Component } from 'react'
import { Field, initialize } from 'redux-form'
import { connect } from 'react-redux'
import { renderInput } from 'utils/fieldRenderers'

class DependentValueInput extends Component {
  componentDidMount() {
    const { attribute, form, dispatch, fieldsArray, index } = this.props
    const fieldValueName = `dep${attribute.id}_value${index}`
    const values = form['order-select-products'].values
    values[fieldValueName] = values[fieldValueName] || ''
    dispatch(initialize('order-select-products', values))
  }

  render() {
    const { data, attribute, index } = this.props
    return (
      <Field
        fieldClassName="product-form-dependent-input"
        simpleInput
        name={`dep${attribute.id}_value${index}`}
        type="text"
        component={renderInput}
      />
    )
  }
}


function select(state) {
  return {
    form: state.form
  }
}

export default connect(select)(DependentValueInput)

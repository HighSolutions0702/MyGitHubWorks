import React, { Component } from 'react'
import { Field, initialize } from 'redux-form'
import { connect } from 'react-redux'
import { renderSelect } from 'utils/fieldRenderers'

class DependentKeyInput extends Component {
  componentDidMount() {
    const { attribute, form, dispatch, fieldsArray, index } = this.props
    const data = attribute.data && JSON.parse(attribute.data)
    const fieldKeyName = `dep${attribute.id}_key${index}`
    const values = form['order-select-products'].values
    values[fieldKeyName] = values[fieldKeyName] || (data.dependent_select && data.dependent_select[0])
    dispatch(initialize('order-select-products', values))
  }

  render() {
    const { data, attribute, index } = this.props
    return (
      <Field
        name={`dep${attribute.id}_key${index}`}
        type="text"
        wrapperClassName="order-select"
        options={data.dependent_select}
        component={renderSelect}
      />
    )
  }
}


function select(state) {
  return {
    form: state.form
  }
}

export default connect(select)(DependentKeyInput)

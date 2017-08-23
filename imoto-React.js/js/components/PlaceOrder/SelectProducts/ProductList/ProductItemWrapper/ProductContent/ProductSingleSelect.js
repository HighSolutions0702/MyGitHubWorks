import React, { Component } from 'react'
import { Field, initialize } from 'redux-form'
import { connect } from 'react-redux'
import { renderSelect } from 'utils/fieldRenderers'
import { createAttributeName } from 'utils/helpers'
import cssModules from 'react-css-modules'
import styles from './index.pcss'

class ProductSingleSelect extends Component {
  componentDidMount() {
    const { attribute, form, dispatch } = this.props
    const attrName = createAttributeName(attribute)
    const formName = 'order-select-products'
    const data = attribute.data && JSON.parse(attribute.data)
    const values = form[formName].values

    values[attrName] = values[attrName] || data[0]
    dispatch(initialize(formName, values, true))
  }

  render() {
    const { attribute } = this.props
    const data = attribute.data && JSON.parse(attribute.data)
    const attrName = createAttributeName(attribute)

    return (
      <div styleName="field-wrapper">
        <Field
          name={attrName}
          productSingleSelect
          component={renderSelect}
          wrapperClassName="order-select"
          options={data}
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

export default connect(select)(cssModules(ProductSingleSelect, styles))

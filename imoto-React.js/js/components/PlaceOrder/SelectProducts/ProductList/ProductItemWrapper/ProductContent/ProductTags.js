import React, { Component } from 'react'
import { Field, initialize } from 'redux-form'
import { connect } from 'react-redux'
import R from 'ramda'
import { renderTagInput } from 'utils/fieldRenderers'
import { createAttributeName } from 'utils/helpers'
import cssModules from 'react-css-modules'
import styles from './index.pcss'

class ProductTags extends Component {
  componentDidMount() {
    const { attribute, form, dispatch } = this.props
    const attrName = createAttributeName(attribute)
    const formName = 'order-select-products'
    const values = form[formName].values

    values[attrName] = R.isEmpty(values[attrName]) || !values[attrName] ?
      [] : values[attrName]
    dispatch(initialize(formName, values))
  }

  render() {
    const { attribute } = this.props
    const data = JSON.parse(attribute.data)

    return (
      <div styleName="field-wrapper tags-wrapper">
        <Field
          name={`tags_${attribute.product.id}-${attribute.id}`}
          component={renderTagInput}
          holder={data.placeholder}
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

export default connect(select)(cssModules(ProductTags, styles, { allowMultiple: true }))

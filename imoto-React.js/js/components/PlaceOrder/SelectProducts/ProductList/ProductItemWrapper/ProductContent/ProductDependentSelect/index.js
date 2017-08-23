import React, { Component } from 'react'
import { Field, initialize } from 'redux-form'
import { connect } from 'react-redux'
import { renderSelect, renderInput } from 'utils/fieldRenderers'
import { createAttributeName } from 'utils/helpers'
import cssModules from 'react-css-modules'
import DependentFields from './DependentFields'
import styles from '../index.pcss'


class DependentSelect extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      array: []
    }
  }

  componentDidMount() {
    const { attribute, form, dispatch } = this.props
    const data = attribute.data && JSON.parse(attribute.data)
    const fieldName = createAttributeName(attribute)
    const values = form['order-select-products'].values
    values[fieldName] = values[fieldName] || (data.main_select && data.main_select[0])
    dispatch(initialize('order-select-products', values, false))
    const changeIndex = values[fieldName].value || values[fieldName]
    this.handleChange(changeIndex)
  }

  componentDidUpdate(prevProps, prevState) {
    const { attribute, form, dispatch } = this.props
    const data = attribute.data && JSON.parse(attribute.data)
    const fieldName = createAttributeName(attribute)
    const prevValue = prevProps.form['order-select-products'].values[fieldName]
    const values = form['order-select-products'].values
    if (prevValue !== values[fieldName]) {
      values[fieldName] = values[fieldName] || (data.main_select && data.main_select[0])
      dispatch(initialize('order-select-products', values, false))
      const changeIndex = values[fieldName].value || values[fieldName]
      this.handleChange(changeIndex)
    }
  }

  handleChange(count) {
    const newArray = []
    for (let i = 0; i < count; i += 1) {
      newArray.push(i)
    }
    this.setState({
      array: newArray
    })
  }

  render() {
    const { attribute, order } = this.props
    const { array } = this.state
    const fieldName = createAttributeName(attribute)
    const data = attribute.data && JSON.parse(attribute.data)
    return (
      <div styleName="field-wrapper">
        <Field
          name={fieldName}
          component={renderSelect}
          wrapperClassName="order-select"
          options={data.main_select}
          onChange={this.handleChange}
        />
        <DependentFields data={data} attribute={attribute} fieldsArray={array} />
      </div>
    )
  }
}

function select(state) {
  return {
    form: state.form
  }
}

export default connect(select)(cssModules(DependentSelect,
  styles, { allowMultiple: true }))

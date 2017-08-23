import React, { Component } from 'react'
import Button from 'components/shared/Button'
import * as validations from 'utils/validationSchemas'
import * as normalize from 'utils/normalizeSchema'
import validate from 'validate.js'
import types from 'constants/actionTypes'
import { reduxForm, Field } from 'redux-form'
import { renderInput, renderCheckbox } from 'utils/fieldRenderers'
import cssModules from 'react-css-modules'
import styles from './index.pcss'


class DiscountCode extends Component {
  render() {
    const submit = (values, dispatch) =>
       new Promise((resolve, reject) =>
          dispatch({
            type: types.ADD_DISCOUNT_CODE_REQUEST,
            payload: {
              values,
              resolve,
              reject
            }
          })
       ).catch(() => {})

    const { handleSubmit } = this.props
    return (
      <div styleName="discount-code-block">
        <div styleName="block-title">
          DISCOUNT CODE
        </div>
        <form
          styleName="discount-form"
          onSubmit={handleSubmit(submit)}
        >
          <Field
            simpleInput
            fieldClassName="discount-code-input"
            name="discountCode"
            component={renderInput}
            type="text"
          />
          <Button
            size="xsmall"
            type="submit"
            color="white-orange"
            onClick={this.getCurrentLocation}
          >
            APPLY!
          </Button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'discount-code',
  enableReinitialize: true
})(cssModules(DiscountCode, styles))

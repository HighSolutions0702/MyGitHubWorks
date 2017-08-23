import React, { Component } from 'react'
import Button from 'components/shared/Button'
import StateSelect from 'components/shared/Select/StateSelect'
import types from 'constants/actionTypes'
import R from 'ramda'
import classNames from 'classnames'
import * as validations from 'utils/validationSchemas'
import * as normalize from 'utils/normalizeSchema'
import validate from 'validate.js'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { renderInput, renderTextArea } from 'utils/fieldRenderers'
import cssModules from 'react-css-modules'
import OrderTabHeader from 'components/PlaceOrder/OrderTabHeader'
import styles from 'components/PlaceOrder/index.pcss'

const validationSchema = {
  address:            { presence: true },
  city:               { presence: true },
  state:              { presence: true },
  zipCode:            validations.zipCode,
  // listingPrice:       { presence: true },
  squareFootage:      { presence: true },
  numberOfBeds:       { presence: true },
  numberOfBaths:      { presence: true },
  listingDescription: { presence: true }
}

const formValidator = (values) => validate(values, validationSchema) || {}

class ListingDetails extends Component {

  render() {
    const submit = (initialValues, dispatch) => {
      const listingPrice = initialValues.listingPrice.replace(/[^\d|.]/g, '')
      const valuesWithState = R.assoc(
        'state', initialValues.state.value || initialValues.state, initialValues
      )
      const values = R.assoc('listingPrice', listingPrice, valuesWithState)

      return new Promise((resolve, reject) =>
          dispatch({
            type: types.ZIP_CODE_VALIDATION_REQUEST,
            payload: {
              values,
              resolve,
              reject
            }
          })
        ).then(() =>
          dispatch({ type: types.GET_CURRENT_LOCATION,
            payload: {
              address: values.address,
              city: values.city,
              zipCode: values.zipCode,
              state: values.state
            }
          })
        ).catch(() => {})
    }

    const { handleSubmit, order: { activeStep, collapseStep } } = this.props
    return (
      <div styleName="content">
        <OrderTabHeader tabStep={1} />
        {
          activeStep === 1 ?
            <form
              onSubmit={handleSubmit(submit)}
              styleName={
                collapseStep === 'listing-details' && 'listing-form-collapsed'
              }
            >
              <div className="two-fields-wrapper">
                <div className="field-left">
                  <Field
                    name="address"
                    component={renderInput}
                    type="text"
                    holder="ADDRESS"
                  />
                </div>
                <div className="field-right">
                  <Field
                    name="secondAddress"
                    component={renderInput}
                    type="text"
                    holder="ADDRESS2"
                  />
                </div>
              </div>
              <div className="two-fields-wrapper">
                <div className="field-left">
                  <Field
                    name="city"
                    component={renderInput}
                    type="text"
                    holder="CITY"
                  />
                </div>
                <div className="field-right">
                  <Field
                    name="state"
                    component={StateSelect}
                    type="text"
                  />
                </div>
              </div>
              <div className="two-fields-wrapper">
                <div className="field-left">
                  <Field
                    name="zipCode"
                    normalize={normalize.zipCode}
                    component={renderInput}
                    type="text"
                    holder="ZIP"
                  />
                </div>
                <div className="field-right">
                  <Field
                    name="listingPrice"
                    normalize={normalize.currency}
                    component={renderInput}
                    type="text"
                    holder="LISTING PRICE"
                  />
                </div>
              </div>
              <div className="three-fields-wrapper">
                <div className="third-left">
                  <Field
                    name="squareFootage"
                    component={renderInput}
                    type="text"
                    normalize={normalize.numberValue}
                    holder="SQUARE FOOTAGE"
                  />
                </div>
                <div className="third-center">
                  <Field
                    name="numberOfBeds"
                    component={renderInput}
                    type="text"
                    normalize={normalize.numberWithDots}
                    holder="BEDS"
                  />
                </div>
                <div className="third-right">
                  <Field
                    name="numberOfBaths"
                    component={renderInput}
                    type="text"
                    normalize={normalize.numberValue}
                    holder="BATHS"
                  />
                </div>
              </div>
              <div className="field-fullwidth">
                <Field
                  name="listingDescription"
                  component={renderTextArea}
                  type="text"
                  holder="LISTING DESCRIPTION"
                />
              </div>
              <div styleName="form-button-container">
                <Button
                  size="xsmall"
                  type="submit"
                  color="white-orange"
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
    form: state.form,
    order: state.placeOrder
  }
}

export default reduxForm({
  form: 'order-listing-details',
  validate: formValidator,
  enableReinitialize: true
})(connect(select)(cssModules(ListingDetails,
  styles, { allowMultiple: true })))

import React, { Component } from 'react'
import Button from 'components/shared/Button'
import types from 'constants/actionTypes'
import StateSelect from 'components/shared/Select/StateSelect'
import { imagePath } from 'utils/helpers'
import * as validations from 'utils/validationSchemas'
import * as normalize from 'utils/normalizeSchema'
import validate from 'validate.js'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { renderInput, renderTextArea, renderCheckbox } from 'utils/fieldRenderers'
import cssModules from 'react-css-modules'
import styles from './index.pcss'

const validationSchema = {
  cardHolder:     { presence: true },
  cardNumber:     validations.cardNumber,
  expirationDate: validations.expirationDate,
  cvv:            validations.cvv,
  acceptTerms:    { presence: true }
}

const formValidator = (values) => validate(values, validationSchema) || {}

class PaymentForm extends Component {
  render() {
    const { handleSubmit, order: { activeStep, collapseStep } } = this.props
    const submit = (values, dispatch) => new Promise((resolve, reject) =>
      dispatch({
        type: types.SET_PAYMENT_INFORMATION_REQUEST,
        payload: {
          values,
          resolve,
          reject
        }
      })
    ).catch(() => {})

    return (
      <div styleName="content">
        <div styleName="payment-form-header">
          <div styleName="payment-form-info">
            <div styleName="payment-form-info-image">
              <img
                role="presentation"
                src={imagePath('/icons/visa-big.svg')}
              />
            </div>
            <div styleName="payment-form-text-block">
              <div styleName="payment-form-title">
                Pay using new credit card
              </div>
              <div styleName="payment-form-description">
                Lorem Ipsum is simply dummy torem Ipsum has been the industrys.
              </div>
            </div>
          </div>
          <div styleName="payment-form-image-wrapper">
            <div styleName="payment-form-image-item">
              <img
                role="presentation"
                src={imagePath('/icons/visa.svg')}
              />
            </div>
            <div styleName="payment-form-image-item">
              <img
                role="presentation"
                src={imagePath('/icons/master-card.svg')}
              />
            </div>
            <div styleName="payment-form-image-item">
              <img
                role="presentation"
                src={imagePath('/icons/maestro.svg')}
              />
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(submit)} >
          <div className="two-fields-wrapper">
            <div className="field-left">
              <Field
                name="cardHolder"
                component={renderInput}
                type="text"
                holder="CARD HOLDER"
              />
            </div>
            <div className="field-right">
              <Field
                name="cardNumber"
                component={renderInput}
                normalize={normalize.cardNumber}
                type="text"
                holder="CARD NUMBER"
              />
            </div>
          </div>
          <div className="two-fields-wrapper">
            <div className="field-left">
              <Field
                name="expirationDate"
                component={renderInput}
                type="text"
                normalize={normalize.expirationDate}
                holder="EXPIRATION DATE"
              />
            </div>
            <div className="field-right">
              <Field
                name="cvv"
                normalize={normalize.cvv}
                type="password"
                component={renderInput}
                holder="CVV(3 DIGIT)"
              />
            </div>
          </div>
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
                name="address2"
                component={renderInput}
                type="text"
                holder="ADDRESS 2"
              />
            </div>
          </div>
          <div className="three-fields-wrapper">
            <div className="third-left">
              <Field
                name="city"
                component={renderInput}
                type="text"
                holder="CITY"
              />
            </div>
            <div className="third-center">
              <Field
                name="state"
                component={StateSelect}
                type="text"
                holder="STATE"
              />
            </div>
            <div className="third-right">
              <Field
                name="zip"
                component={renderInput}
                type="text"
                holder="ZIP"
              />
            </div>
          </div>
          <div styleName="checkbox-block">
            <Field
              name="isSaveCard"
              component={renderCheckbox}
            />
            <div styleName="checkbox-text">
              Save card for later
            </div>
          </div>
          <div styleName="form-button-container">
            <div styleName="checkbox-addition-block">
              <Field
                name="acceptTerms"
                component={renderCheckbox}
              />
              <div styleName="checkbox-text">
                Accept terms and conditions
              </div>
            </div>
            <Button
              size="xsmall"
              type="submit"
              color="white-orange"
            >
              CONTINUE
            </Button>
          </div>
        </form>
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
  form: 'payment-form',
  validate: formValidator,
  enableReinitialize: true
})(connect(select)(cssModules(PaymentForm,
  styles, { allowMultiple: true })))

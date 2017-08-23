import React, { Component } from 'react'
import Button from 'components/shared/Button'
import types from 'constants/actionTypes'
import StateSelect from 'components/shared/Select/StateSelect'
import * as validations from 'utils/validationSchemas'
import * as normalize from 'utils/normalizeSchema'
import validate from 'validate.js'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { renderInput } from 'utils/fieldRenderers'
import cssModules from 'react-css-modules'
import styles from './index.pcss'

const validationSchema = {
  cardHolder:     { presence: true },
  cardNumber:     validations.cardNumber,
  expirationDate: validations.expirationDate,
  cvv:            validations.cvv
}

const formValidator = (values) => validate(values, validationSchema) || {}

class CreditCard extends Component {
  render() {
    const { handleSubmit } = this.props
    const submit = (values, dispatch) => new Promise((resolve, reject) =>
      dispatch({
        type: types.ADD_CREDIT_CARD_REQUEST,
        payload: {
          values,
          resolve,
          reject
        }
      })
     )
    .then(() => {
      this.props.onSaveHandle()
    })
    .catch(() => {})

    return (
      <div styleName="content">
        <form onSubmit={handleSubmit(submit)} >
          <div className="two-fields-wrapper">
            <div className="field-left">
              <Field
                name="holderName"
                component={renderInput}
                type="text"
                holder="CARD HOLDER"
              />
            </div>
            <div className="field-right">
              <Field
                name="number"
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
          <div className="one-fields-wrapper">
            <div className="field">
              <Field
                name="holderAddress"
                component={renderInput}
                type="text"
                holder="ADDRESS"
              />
            </div>
          </div>
          <div className="three-fields-wrapper">
            <div className="third-left">
              <Field
                name="holderCity"
                component={renderInput}
                type="text"
                holder="CITY"
              />
            </div>
            <div className="third-center">
              <Field
                name="holderState"
                component={renderInput}
                type="text"
                holder="STATE"
              />
            </div>
            <div className="third-right">
              <Field
                name="holderZip"
                component={renderInput}
                type="text"
                holder="ZIP"
              />
            </div>
          </div>
          <div styleName="form-button-container">
            <Button
              size="xsmall"
              type="button"
              color="white-gray"
              onClick={(e) => this.props.onCancelHandle(e)}
            >
              CANCEL
            </Button>
            <Button
              size="xsmall"
              type="submit"
              color="white-orange"
            >
              SAVE
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

function select(state) {
  return {
    form: state.form
  }
}

export default reduxForm({
  form: 'credit-card-form',
  validate: formValidator,
  enableReinitialize: true
})(connect(select)(cssModules(CreditCard, styles, { allowMultiple: true })))

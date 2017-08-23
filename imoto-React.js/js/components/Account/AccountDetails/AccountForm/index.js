import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import * as validations from 'utils/validationSchemas'
import validate from 'utils/validate.js'
import { renderInput } from 'utils/fieldRenderers'
import types from 'constants/actionTypes'
import Button from 'components/shared/Button'
import cssModules from 'react-css-modules'
import PaymentMethods from './PaymentMethods'
import styles from './index.pcss'

const validationSchema = {
  fullName:             { presence: true },
  email:                validations.email,
  password:             validations.passwordOptional,
  passwordConfirmation: validations.passwordConfirmationOptional,
  mobile:               { presence: true },
  secondEmail:          validations.extraEmail,
  thirdEmail:           validations.extraEmail,
  fourthEmail:          validations.extraEmail
}

const formValidator = (values) => validate(values, validationSchema) || {}

const submit = (values, dispatch, props) =>
  new Promise((resolve, reject) => {
    dispatch({
      type: types.UPDATE_CUSTOMER_REQUEST,
      payload: {
        values,
        resolve,
        reject
      }
    })
  }).then(() => props.refetch().then(props.reset))
    .catch(() => {})

class AccountForm extends Component {
  componentWillMount() {
    this.props.reset() // see https://github.com/erikras/redux-form/issues/1385#issuecomment-273990831
  }

  render() {
    const { handleSubmit, profileType } = this.props
    const {
      companyName,
      officeBranch,
      city,
      state,
      zipCode,
      creditCards,
      website
    } = this.props.initialValues
    return (
      <div styleName="wrapper">
        <form onSubmit={handleSubmit(submit)}>
          <div styleName="wrapper-head-container">
            <div styleName="head-container">
              <span styleName="name">Account Settings</span>
              <span styleName="description">Here, can download their products from the order history.</span>
            </div>
          </div>
          <div className="two-fields-wrapper">
            <div className="field-left">
              <Field
                name="fullName"
                component={renderInput}
                type="text"
                holder="FULL NAME"
              />
            </div>
            <div className="field-right">
              <Field
                name="email"
                component={renderInput}
                type="text"
                holder="EMAIL"
              />
            </div>
          </div>
          <div className="two-fields-wrapper">
            <div className="field-left">
              <Field
                name="password"
                component={renderInput}
                type="password"
                holder="PASSWORD"
              />
            </div>
            <div className="field-right">
              <Field
                name="passwordConfirmation"
                component={renderInput}
                type="password"
                holder="CONFIRM PASSWORD"
              />
            </div>
          </div>
          <div className="field-fullwidth">
            <Field
              name="mobile"
              component={renderInput}
              type="text"
              holder="MOBILE"
            />
          </div>
          <div className="field-fullwidth">
            <Field
              name="secondEmail"
              component={renderInput}
              type="text"
              holder="SECOND EMAIL"
            />
          </div>
          <div className="field-fullwidth">
            <Field
              name="thirdEmail"
              component={renderInput}
              type="text"
              holder="THIRD EMAIL"
            />
          </div>
          <div className="field-fullwidth">
            <Field
              name="fourthEmail"
              component={renderInput}
              type="text"
              holder="FOURTH EMAIL"
            />
          </div>
          {
            profileType === 'agent' ?
              <div>
                <div className="field-fullwidth">
                  <div styleName="wrapper-head-container">
                    <div styleName="head-container">
                      <span styleName="name">Company Info</span>
                      <span styleName="description">
                        Here, can download their products from the order history.
                      </span>
                    </div>
                  </div>
                </div>
                <div className="two-fields-wrapper">
                  <div className="field-left darkened-field">
                    <Field
                      name="companyName"
                      component={renderInput}
                      type="text"
                      holder="COMPANY NAME"
                    />
                  </div>
                  <div className="field-right darkened-field">
                    <Field
                      name="officeBranch"
                      component={renderInput}
                      type="text"
                      holder="OFFICE BRANCH"
                    />
                  </div>
                </div>
                <div className="two-fields-wrapper">
                  <div className="field-left darkened-field">
                    <Field
                      name="city"
                      component={renderInput}
                      type="text"
                      holder="CITY"
                    />
                  </div>
                  <div className="field-right darkened-field">
                    <Field
                      name="state"
                      component={renderInput}
                      type="text"
                      holder="STATE"
                    />
                  </div>
                </div>
                <div className="two-fields-wrapper">
                  <div className="field-left darkened-field">
                    <Field
                      name="zipCode"
                      component={renderInput}
                      type="text"
                      holder="ZIP CODE"
                    />
                  </div>
                  <div className="field-right darkened-field">
                    <Field
                      name="companyWebsite"
                      component={renderInput}
                      type="text"
                      holder="WEBSITE"
                    />
                  </div>
                </div>
              </div> : null
          }
          <div className="field-fullwidth">
            <div styleName="submit-container">
              <Button
                size="normal"
                type="submit"
                color="orange"
              >
                SUBMIT
              </Button>
            </div>
          </div>
        </form>
        <PaymentMethods creditCards={creditCards} />
      </div>
    )
  }
}

export default (reduxForm({
  form: 'AccountForm',
  validate: formValidator,
  enableReinitialize: true // it doesn't initialize the form without this black magic /
})(cssModules(AccountForm, styles)))

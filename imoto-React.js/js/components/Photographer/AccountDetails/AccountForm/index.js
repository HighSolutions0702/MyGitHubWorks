import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import * as validations from 'utils/validationSchemas'
import validate from 'utils/validate.js'
import { renderInput } from 'utils/fieldRenderers'
import types from 'constants/actionTypes'
import Button from 'components/shared/Button'
import SideBar from 'components/Photographer/SideBar'
import cssModules from 'react-css-modules'
import styles from './index.pcss'

const validationSchema = {
  firstName:            { presence: true },
  lastName:             { presence: true },
  email:                validations.email,
  mobile:               { presence: true },
  password:             validations.passwordOptional,
  passwordConfirmation: validations.passwordConfirmationOptional
}

const formValidator = (values) => validate(values, validationSchema) || {}

const submit = (values, dispatch, props) =>
  new Promise((resolve, reject) => {
    dispatch({
      type: types.UPDATE_PHOTOGRAPHER_REQUEST,
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
    const { handleSubmit, initialValues: {
      firstName,
      lastName,
      fullName,
      avatar,
      phone
    } } = this.props

    return (
      <div className="root">
        <div styleName="row">
          <div styleName="content">
            <div styleName="wrapper">
              <form onSubmit={handleSubmit(submit)}>
                <div styleName="wrapper-head-container">
                  <div styleName="head-container">
                    {/* <span styleName="name">Account Settings</span>*/}
                    <span styleName="description">Here you can edit your profile picture and account details.</span>
                  </div>
                </div>
                <div className="two-fields-wrapper">
                  <div className="field-left">
                    <Field
                      name="firstName"
                      component={renderInput}
                      type="text"
                      holder="FIRST NAME"
                    />
                  </div>
                  <div className="field-right">
                    <Field
                      name="lastName"
                      component={renderInput}
                      type="text"
                      holder="LAST NAME"
                    />
                  </div>
                </div>
                <div className="two-fields-wrapper">
                  <div className="field-left">
                    <Field
                      name="email"
                      component={renderInput}
                      type="text"
                      holder="EMAIL"
                    />
                  </div>
                  <div className="field-right">
                    <Field
                      name="phone"
                      component={renderInput}
                      type="text"
                      holder="MOBILE"
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
            </div>
          </div>
          <div styleName="side-bar">
            <SideBar
              fullName={fullName}
              avatar={avatar}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default (reduxForm({
  form: 'AccountForm',
  validate: formValidator,
  enableReinitialize: true // it doesn't initialize the form without this black magic /
})(cssModules(AccountForm, styles)))

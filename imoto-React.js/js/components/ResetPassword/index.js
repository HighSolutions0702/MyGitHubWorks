import React, { Component } from 'react'
import { Link } from 'react-router'
import Layout from 'components/shared/Layout'
import { connect } from 'react-redux'
import cssModules from 'react-css-modules'
import styles from 'components/ForgotPassword/index.pcss'
import * as validations from 'utils/validationSchemas'
import validate from 'validate.js'
import { reduxForm, Field } from 'redux-form'
import { imagePath } from 'utils/helpers'
import { renderInput } from 'utils/fieldRenderers'
import types from 'constants/actionTypes'
import Button from 'components/shared/Button'

const validationSchema = {
  password: validations.password,
  passwordConfirmation: validations.passwordConfirmation
}

const formValidator = (values) => validate(values, validationSchema) || {}

class ResetPassword extends Component {
  render() {
    const { handleSubmit, route } = this.props
    const token = route.token
    const tokenObj = { resetPasswordToken: token }
    const submit = (values, dispatch) => {
      const modifiedValues = Object.assign(values, tokenObj)
      return new Promise((resolve, reject) => {
        dispatch({
          type: types.RESET_PASSWORD_REQUEST,
          payload: {
            modifiedValues,
            resolve,
            reject
          }
        })
      }).catch(() => {})
    }
    return (
      <Layout>
        <div styleName="content">
          <form
            onSubmit={handleSubmit(submit)}
            styleName="main"
          >
            <div styleName="header">
              <div styleName="header-title">
              Reset Password
            </div>
              <div>
                <img src={imagePath('/logo/imoto_logo1.svg')} alt="logo" />
              </div>
            </div>
            <div styleName="form-input">
              <Field
                name="password"
                component={renderInput}
                type="password"
                holder="password"
              />
            </div>
            <div styleName="form-input">
              <Field
                name="passwordConfirmation"
                component={renderInput}
                type="password"
                holder="password confirmation"
              />
            </div>
            <div styleName="button-container">
              <Button type="submit">
              RESET PASSWORD
            </Button>
            </div>
          </form>
        </div>
      </Layout>
    )
  }
}

function select(state) {
  return {
    route: state.routing.locationBeforeTransitions.query
  }
}

export default reduxForm({
  form: 'resetPassword',
  validate: formValidator
})(connect(select)(cssModules(ResetPassword, styles)))

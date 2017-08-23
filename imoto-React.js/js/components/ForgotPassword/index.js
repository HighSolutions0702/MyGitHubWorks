import React, { Component } from 'react'
import { Link } from 'react-router'
import Layout from 'components/shared/Layout'
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
  email: validations.email
}

const formValidator = (values) => validate(values, validationSchema) || {}

class ForgotPassword extends Component {
  render() {
    const submit = (values, dispatch) =>
      new Promise((resolve, reject) => {
        dispatch({
          type: types.FORGOT_PASSWORD_REQUEST,
          payload: {
            values,
            resolve,
            reject
          }
        })
      }).catch(() => {})
    const { handleSubmit } = this.props
    return (
      <Layout>
        <div styleName="content">
          <form onSubmit={handleSubmit(submit)} styleName="main">
            <div styleName="header">
              <div styleName="header-title">
                Forgot Password
              </div>
              <div>
                <img src={imagePath('/logo/imoto_logo1.svg')} alt="logo" />
              </div>
            </div>
            <div styleName="form-input">
              <Field
                name="email"
                component={renderInput}
                type="text"
                holder="email address"
              />
            </div>
            <div styleName="button-container">
              <Link to={'/login'}>
                <Button type="button" color="white-gray">
                  BACK TO LOGIN
                </Button>
              </Link>
              <Button type="submit">
                SEND EMAIL
              </Button>
            </div>
          </form>
        </div>
      </Layout>
    )
  }
}

export default reduxForm({
  form: 'forgotPassword',
  validate: formValidator
})(cssModules(ForgotPassword, styles))

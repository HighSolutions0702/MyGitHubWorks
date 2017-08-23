import React, { Component } from 'react'
import { Link } from 'react-router'
import Layout from 'components/shared/Layout'
import cssModules from 'react-css-modules'
import styles from 'components/Login/index.pcss'
import * as validations from 'utils/validationSchemas'
import validate from 'validate.js'
import { reduxForm, Field } from 'redux-form'
import { imagePath } from 'utils/helpers'
import { renderInput, renderCheckbox } from 'utils/fieldRenderers'
import types from 'constants/actionTypes'
import Button from 'components/shared/Button'

const validationSchema = {
  email: validations.email,
  password: validations.password
}

const formValidator = (values) => validate(values, validationSchema) || {}

class Login extends Component {
  render() {
    const submit = (values, dispatch) =>
       new Promise((resolve, reject) =>
          dispatch({
            type: types.USER_LOGIN_REQUEST,
            payload: {
              values,
              resolve,
              reject
            }
          })
       ).catch(() => {})

    const { handleSubmit } = this.props
    return (
      <Layout>
        <div styleName="content">
          <div className="root">
            <form onSubmit={handleSubmit(submit)}>
              <div styleName="main">
                <div styleName="wrapper">
                  <div styleName="logo-container">
                    <div styleName="tab-header">
                      Log In
                    </div>
                    <div>
                      <img src={imagePath('/logo/imoto_logo1.svg')} alt="logo" />
                    </div>
                  </div>
                  <div className="two-fields-wrapper">
                    <div className="field-left">
                      <Field
                        name="email"
                        component={renderInput}
                        type="text"
                        holder="email address"
                      />
                    </div>
                    <div className="field-right">
                      <Field
                        name="password"
                        component={renderInput}
                        type="password"
                        holder="password"
                      />
                    </div>
                  </div>
                  <div styleName="confirm-container">
                    <div styleName="column">
                      <Field
                        name="rememberMe"
                        component={renderCheckbox}
                        type="text"
                        description=" Remember me"
                      />
                      <div>
                        Not a member?
                        <span styleName="sign-up">
                          <Link to={'/get-started'}> Sign up now</Link>
                        </span>
                      </div>
                    </div>
                    <div styleName="button-container">
                      <Button
                        size="xsmall"
                        type="submit"
                      >
                      LOG
                    </Button>
                    </div>
                    <Link to={'/forgot-password'}>
                      <div styleName="forgot">
                        Forgot Your Password?
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    )
  }
}

export default reduxForm({
  form: 'login',
  validate: formValidator,
  initialValues: {
    rememberMe: false
  }
})(cssModules(Login, styles))

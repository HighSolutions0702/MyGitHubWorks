import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from 'components/Registration/index.pcss'
import { connect } from 'react-redux'
import { imagePath } from 'utils/helpers'
import { renderInput, renderCheckbox, renderCaptcha } from 'utils/fieldRenderers'
import * as validations from 'utils/validationSchemas'
import validate from 'validate.js'
import { reduxForm, Field } from 'redux-form'
import Dropzone from 'react-dropzone'
import Button from 'components/shared/Button'
import R from 'ramda'
import types from 'constants/actionTypes'

const validationSchema = {
  fullName:             { presence: true },
  email:                validations.email,
  password:             validations.password,
  passwordConfirmation: validations.passwordConfirmation,
  mobile:               { presence: true },
  secondEmail:          validations.extraEmail,
  thirdEmail:           validations.extraEmail,
  fourthEmail:          validations.extraEmail,
  recaptcha:            { presence: true }
}

const formValidator = (values) => validate(values, validationSchema) || {}

class RegistrationHomeownerForm extends Component {
  constructor() {
    super()
    this.onDrop = this.onDrop.bind(this)
    this.submit = this.submit.bind(this)
  }
  onDrop(files) {
    this.props.dispatch({
      type: types.UPLOAD_PERSONAL_PHOTO,
      payload: files[0]
    })
  }
  submit(initialValues, dispatch) {
    const avatarObj = { avatar: R.isEmpty(this.props.photo) ? undefined : this.props.photo }
    const values = Object.assign(initialValues, avatarObj)
    return new Promise((resolve, reject) => {
      dispatch({
        type: types.HOMEOWNER_REGISTRATION_REQUEST,
        payload: { values, resolve, reject }
      })
    }).catch(() => {})
  }

  render() {
    const { handleSubmit, photo } = this.props

    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <div styleName="row">
          <div styleName="col">
            <div styleName="main-container">
              <div styleName="dropbox-container">
                <div styleName="tab-header">
                  Personal Information
                </div>
                <Dropzone
                  onDrop={this.onDrop}
                  styleName="dropzone"
                >
                  {
                    R.isEmpty(photo) ?
                      <img src={imagePath('icons/dropzone-default.svg')} role="presentation" />
                    :
                      <img src={photo.preview} alt={photo.name} />
                  }
                </Dropzone>
              </div>
              <div className="two-fields-wrapper">
                <div className="field-left">
                  <Field
                    name="fullName"
                    component={renderInput}
                    type="text"
                    holder="full name"
                  />
                </div>
                <div className="field-right">
                  <Field
                    name="email"
                    component={renderInput}
                    type="text"
                    holder="email"
                  />
                </div>
              </div>
              <div className="two-fields-wrapper">
                <div className="field-left">
                  <Field
                    name="password"
                    component={renderInput}
                    type="password"
                    holder="password"
                  />
                </div>
                <div className="field-right">
                  <Field
                    name="passwordConfirmation"
                    component={renderInput}
                    type="password"
                    holder="confirm password"
                  />
                </div>
              </div>
              <div className="two-fields-wrapper">
                <div className="field-left">
                  <Field
                    name="mobile"
                    component={renderInput}
                    type="text"
                    holder="mobile"
                  />
                </div>
                <div className="field-right">
                  <Field
                    name="personalWebsite"
                    component={renderInput}
                    type="text"
                    holder="website"
                  />
                </div>
              </div>
              <div className="field-fullwidth">
                <Field
                  name="secondEmail"
                  component={renderInput}
                  type="text"
                  holder="Second email"
                />
              </div>
              <div className="field-fullwidth">
                <Field
                  name="thirdEmail"
                  component={renderInput}
                  type="text"
                  holder="Third email"
                />
              </div>
              <div className="field-fullwidth">
                <Field
                  name="fourthEmail"
                  component={renderInput}
                  type="text"
                  holder="Fourth email"
                />
              </div>
              <div styleName="fullwidth-recaptcha">
                <Field name="recaptcha" component={renderCaptcha} />
              </div>
              <div className="two-fields-wrapper">
                <div styleName="double-wrapper-left">
                  <div styleName="save-pass-field">
                    <Field
                      name="savePass"
                      id="savePass"
                      component={renderCheckbox}
                      type="text"
                      description="Save my password for later"
                    />
                  </div>
                </div>
                <div styleName="double-wrapper-right">
                  <Button
                    size="xlarge"
                    type="submit"
                    styleName="button-create-account"
                  >
                    CREATE ACCOUNT
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

function select(state) {
  return {
    photo: state.personalPhoto
  }
}

export default reduxForm({
  form: 'registrationHomeowner',
  validate: formValidator,
  initialValues: {
    role: 'homeowner',
    rememberMe: false,
    personalWebsite: null,
    secondEmail: null,
    thirdEmail: null,
    fourthEmail: null
  }
})(connect(select)(cssModules(RegistrationHomeownerForm, styles)))

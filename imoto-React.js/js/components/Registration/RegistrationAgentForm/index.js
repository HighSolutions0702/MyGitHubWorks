import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from 'components/Registration/index.pcss'
import * as validations from 'utils/validationSchemas'
import validate from 'validate.js'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import types from 'constants/actionTypes'
import R from 'ramda'
import PersonalInformation from './PersonalInformation'
import CompanyInformation from './CompanyInformation'

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

class Registration extends Component {
  constructor() {
    super()
    this.submit = this.submit.bind(this)
  }
  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch({
      type: types.RESET_REGISTRATION_COMPANY
    })
  }

  submit(initialValues, dispatch) {
    const { company, photo, logo } = this.props

    const additionalData = {
      avatar: R.isEmpty(photo) ? undefined : photo,
      logo: R.isEmpty(logo) ? undefined : logo,
      companyId: company.id
    }
    const values = Object.assign(initialValues, additionalData)

    if (typeof values.companyName === 'object') {
      values.companyName = values.companyName.label
    }

    return new Promise((resolve, reject) => {
      dispatch({
        type: types.AGENT_REGISTRATION_REQUEST,
        payload: { values, resolve, reject }
      })
    }).catch(() => {})
  }

  render() {
    const { handleSubmit, company, photo, logo } = this.props
    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <div styleName="row">
          <div styleName="col">
            <PersonalInformation photo={photo} />
          </div>
          <div styleName="col">
            <CompanyInformation
              values={{
                companyId:             company.id,
                companyOfficeBranch:   company.office_branch,
                companyCity:           company.city,
                companyState:          company.state,
                companyZipCode:        company.zip_code,
                companyWebsite:        company.website,
                companyLogo:           company.logo,
                companyName:           company.name,
                isNewCompany:          company.isNewCompany,
                logo
              }}
            />
          </div>
        </div>
      </form>
    )
  }
}

function select(state) {
  return {
    company: state.choosedCompany,
    photo:   state.personalPhoto,
    logo: state.companyImage
  }
}

export default reduxForm({
  form: 'registrationAgent',
  validate: formValidator,
  initialValues: {
    role: 'agent',
    rememberMe: false,
    personalWebsite: null,
    secondEmail: null,
    thirdEmail: null
  }
})(connect(select)(cssModules(Registration, styles)))

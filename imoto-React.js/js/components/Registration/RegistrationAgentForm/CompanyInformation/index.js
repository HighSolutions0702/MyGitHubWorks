import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import styles from 'components/Registration/index.pcss'
import { connect } from 'react-redux'
import { imagePath } from 'utils/helpers'
import { renderInput, renderCheckbox, renderCaptcha } from 'utils/fieldRenderers'
import { Field } from 'redux-form'
import Button from 'components/shared/Button'
import R from 'ramda'
import Dropzone from 'react-dropzone'
import types from 'constants/actionTypes'
import CompanyListSelect from 'components/shared/Select/CompanyListSelect'
import ListBranchSelect from 'components/shared/Select/ListBranchSelect'

class CompanyInformation extends Component {

  constructor(props) {
    super(props)
    this.onDrop = this.onDrop.bind(this)
  }

  onDrop(files) {
    this.props.dispatch({
      type: types.UPLOAD_COMPANY_IMAGE,
      payload: files[0]
    })
  }

  render() {
    const {
      isNewCompany,
      companyName,
      companyOfficeBranch,
      companyCity,
      companyState,
      companyZipCode,
      companyWebsite,
      companyId,
      companyLogo,
      logo
    } = this.props.values
    return (
      <div styleName="main-container">
        <div styleName="dropbox-container">
          <div styleName="tab-header">
            Company Information
          </div>
          <div styleName="dropzone">
            {isNewCompany ?
              <Dropzone onDrop={this.onDrop} styleName="dropzone">
                {
                  R.isEmpty(logo) ?
                    <img src={imagePath('icons/dropzone-default.svg')} role="presentation" />
                    :
                    <img src={logo.preview} alt={logo.name} />
                }
              </Dropzone> :

              <img src={companyLogo || imagePath('user.png')} role="presentation" />
            }
          </div>
        </div>
        <div className="two-fields-wrapper">
          <div className="field-left ">
            <CompanyListSelect />
          </div>
          <div className={`field-left ${isNewCompany ? '' : 'darkened-field'}`}>
            {companyId && !isNewCompany ? <ListBranchSelect companyName={companyName} /> :
            <Field
              name="companyOfficeBranch"
              component={renderInput}
              type="text"
              holder={companyOfficeBranch || 'office branch'}
              disabled={!isNewCompany}
            />
            }
          </div>
        </div>
        <div className="two-fields-wrapper">
          <div className={`field-left ${isNewCompany ? '' : 'darkened-field'}`}>
            <Field
              name="companyCity"
              component={renderInput}
              type="text"
              holder={companyCity || 'city'}
              disabled={!isNewCompany}
            />
          </div>
          <div className={`field-left ${isNewCompany ? '' : 'darkened-field'}`}>
            <Field
              name="companyState"
              component={renderInput}
              type="text"
              holder={companyState || 'state'}
              disabled={!isNewCompany}
            />
          </div>
        </div>
        <div className="two-fields-wrapper">
          <div className={`field-left ${isNewCompany ? '' : 'darkened-field'}`}>
            <Field
              name="companyZipCode"
              component={renderInput}
              type="text"
              holder={companyZipCode || 'zip code'}
              disabled={!isNewCompany}
            />
          </div>
          <div className={`field-left ${isNewCompany ? '' : 'darkened-field'}`}>
            <Field
              name="companyWebsite"
              component={renderInput}
              type="text"
              holder={companyWebsite || 'website'}
              disabled={!isNewCompany}
            />
          </div>
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
    )
  }
}

export default connect()(cssModules(CompanyInformation, styles))

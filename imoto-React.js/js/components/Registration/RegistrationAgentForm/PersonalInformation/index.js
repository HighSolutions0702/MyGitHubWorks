import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import { Field } from 'redux-form'
import styles from 'components/Registration/index.pcss'
import { connect } from 'react-redux'
import { imagePath } from 'utils/helpers'
import { renderInput } from 'utils/fieldRenderers'
import Dropzone from 'react-dropzone'
import R from 'ramda'
import types from 'constants/actionTypes'

class PersonalInformation extends Component {
  constructor(props) {
    super(props)
    this.onDrop = this.onDrop.bind(this)
  }

  onDrop(files) {
    this.props.dispatch({
      type: types.UPLOAD_PERSONAL_PHOTO,
      payload: files[0]
    })
  }
  render() {
    const { photo } = this.props

    return (
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
      </div>
    )
  }
}

export default connect()(cssModules(PersonalInformation, styles))

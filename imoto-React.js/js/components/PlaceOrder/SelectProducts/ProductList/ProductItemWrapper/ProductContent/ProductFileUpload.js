import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, initialize } from 'redux-form'
import { renderInput } from 'utils/fieldRenderers'
import cssModules from 'react-css-modules'
import Dropzone from 'react-dropzone'
import Button from 'components/shared/Button'
import types from 'constants/actionTypes'
import { createAttributeName } from 'utils/helpers'
import styles from './index.pcss'

class ProductFileUpload extends Component {
  constructor(props) {
    super(props)
    this.onDrop = this.onDrop.bind(this)
  }

  componentDidMount() {
    const { attribute, form, dispatch } = this.props
    const data = attribute.data && JSON.parse(attribute.data)
    const inputName = createAttributeName(attribute)
    const values = form['order-select-products'].values
    values[inputName] = 'upload'
    dispatch(initialize('order-select-products', values, false))
  }

  onDrop(files) {
    const { dispatch, attribute } = this.props
    dispatch({
      type: types.UPLOAD_PRODUCT_FILE,
      payload: {
        file: files[0],
        id:   attribute.id
      }
    })
  }

  render() {
    const { attribute } = this.props
    const inputName = createAttributeName(attribute)
    return (
      <div styleName="file-upload-wrapper">
        <Dropzone
          onDrop={this.onDrop}
          style={{}}
        >
          <Button
            size="xsmall"
            color="white-orange"
          >
            UPLOAD
          </Button>
        </Dropzone>
        <Field
          simpleInput
          name={inputName}
          component={renderInput}
          type={'hidden'}
        />
        <div styleName="file-upload-description">
          (PDF, PNG or JPG)
        </div>
      </div>
    )
  }
}

function select(state) {
  return {
    form: state.form
  }
}

export default connect(select)(cssModules(ProductFileUpload,
  styles, { allowMultiple: true }))

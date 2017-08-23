import React, { Component } from 'react'
import Button from 'components/shared/Button'
import types from 'constants/actionTypes'
import { reduxForm, Field } from 'redux-form'
import { renderInput } from 'utils/fieldRenderers'
import * as normalize from 'utils/normalizeSchema'
import cssModules from 'react-css-modules'
import validate from 'validate.js'
import styles from '../index.pcss'

const validationSchema = {
  fullAddress: { presence: true },
  orderNumber: { presence: true }
}

const formValidator = (values) => validate(values, validationSchema) || {}

const submit = (values, dispatch, props) =>
  new Promise((resolve, reject) => {
    dispatch({
      type: types.LISTING_TEASER_CHANGE,
      payload: {
        values,
        resolve,
        reject
      }
    })
  }).then(() => {})
  .catch(() => {})

class ListingTeaser extends Component {

  constructor(props) {
    super(props)
    this.state = props.initialValues
  }

  componentWillMount() {
    this.props.reset() // see https://github.com/erikras/redux-form/issues/1385#issuecomment-273990831
  }

  render() {
    const { product, handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit(submit)}>
        <div styleName="block">
          <div styleName="wrapper-head-container">
            <span styleName="name">{product.name}</span>
            <div styleName="button-container">
              <span styleName="price-orange">{normalize.currency(product.price)}</span>
            </div>
          </div>
          <div styleName="block-content">

            <div styleName="teaser-desc-wrap">
              <div styleName="video-desc-title">ORDER #</div>
              <Field
                styleName="video-desc-input"
                component={renderInput}
                name="orderNumber"
              />
              <div styleName="video-fullwidth-desc">

                <div styleName="video-desc-title">FULL ADDRESS </div>
                <Field
                  styleName="video-desc-input-full"
                  component={renderInput}
                  name="fullAddress"
                />

              </div>
            </div>

          </div>

          <div styleName="buttons-container">
            <div styleName="button-left">
              <Button
                size="xsmall"
                type="button"
                color="white-gray"
                styleName="upload-button"
              >
              BACK
            </Button>
            </div>
            <div styleName="button-right">
              <Button
                size="xsmall"
                type="submit"
                color="white-orange2"
                styleName="upload-button"
              >
              CONTINUE
            </Button>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'upload-order-listing-teaser',
  validate: formValidator,
  enableReinitialize: true
})(cssModules(ListingTeaser, styles))

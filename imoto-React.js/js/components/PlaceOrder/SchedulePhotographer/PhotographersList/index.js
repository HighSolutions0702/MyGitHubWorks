import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import types from 'constants/actionTypes'
import { connect } from 'react-redux'
import R from 'ramda'
import { reduxForm } from 'redux-form'
import * as validations from 'utils/validationSchemas'
import * as normalize from 'utils/normalizeSchema'
import Button from 'components/shared/Button'
import validate from 'validate.js'
import moment from 'moment'
import PhotographerAviabilityBlock from './PhotographerAviabilityBlock'
import NoPhotographerAvailable from './NoPhotographerAvailable'
import styles from './index.pcss'

const validationSchema = {}
const formValidator = (values) => validate(values, validationSchema) || {}

class PhotographersList extends Component {
  constructor(props) {
    super(props)
    this.handleBackClick = this.handleBackClick.bind(this)
  }

  handleBackClick() {
    const { dispatch } = this.props
    dispatch({ type: types.CHANGE_PLACE_ORDER_ACTIVE_STEP, payload: 2 })
  }

  render() {
    const {
      order:
        {
          showFirstAvailablePhotographer,
          availablePhotographers,
          chosenPhotographers
        },
      order,
      handleSubmit
    } = this.props
    const submit = (initialValues, dispatch) => new Promise((resolve, reject) => {
      const values = Object.assign(initialValues, {
        photographerId: chosenPhotographers.id
      })
      return dispatch({
        type: types.SET_ORDER_PHOTOGRAPHERS_REQUEST,
        payload: {
          values,
          resolve,
          reject
        }
      })
    }).catch(() => {})
    const helper = availablePhotographers.reduce((acc, val) => acc + val.available_ranges.length, 0)

    return (
      <div>
        <form onSubmit={handleSubmit(submit)}>
          {
            helper ?
              <div>
                {
                !showFirstAvailablePhotographer &&
                  <div styleName="block-header">
                    <div>
                      PREFFERED PHOTOGRAPHER
                    </div>
                    <div>
                      { `${order.availablePhotographers.length} AVAILABLE` }
                    </div>
                  </div>
              }
                {
                showFirstAvailablePhotographer ?
                  <PhotographerAviabilityBlock
                    order={order}
                    photographer={order.availablePhotographers[0]}
                  />
                :
                  order.availablePhotographers.map((item, index) =>
                    <PhotographerAviabilityBlock
                      order={order}
                      photographer={item}
                      photographerIndex={index}
                    />
                  )
                }
              </div>
            :
              <NoPhotographerAvailable />
          }
          <div styleName="form-button-container">
            <Button
              size="xsmall"
              type="button"
              color="white-gray"
              onClick={this.handleBackClick}
            >
              BACK
            </Button>
            <Button
              size="xsmall"
              type="submit"
              color="white-orange"
            >
              CONTINUE
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'order-photographers',
  validate: formValidator,
  enableReinitialize: true,
  destroyOnUnmount: false
})(connect()(cssModules(PhotographersList,
  styles, { allowMultiple: true })))

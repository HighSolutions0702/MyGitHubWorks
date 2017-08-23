import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { renderDatepicker, renderSelect } from 'utils/fieldRenderers'
import * as validations from 'utils/validationSchemas'
import * as normalize from 'utils/normalizeSchema'
import classNames from 'classnames'
import Button from 'components/shared/Button'
import validate from 'validate.js'
import types from 'constants/actionTypes'
import { imagePath } from 'utils/helpers'
import R from 'ramda'
import moment from 'moment'
import selectPhotographerInterval from 'utils/selectPhotographerInterval'
import DatePicker from 'components/shared/DatePicker'
import cssModules from 'react-css-modules'
import styles from './index.pcss'

const validationSchema = {
  date: { presence: true }
}
const formValidator = (values) => validate(values, validationSchema) || {}

class CalendarPanel extends Component {
  constructor(props) {
    super(props)

    this.state = {
      first: true
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleActive = this.handleActive.bind(this)
  }

  handleFormSubmit() {
    const { buttonSubmit } = this.refs
    setTimeout(() => {
      buttonSubmit.click()
    }, 200)
  }

  handleActive(first) {
    const { dispatch } = this.props

    if (first) {
      dispatch({ type: types.GET_FIRST_AVAILABLE_PHOTOGRAPHER })
    }

    this.setState({
      first
    })
  }

  render() {
    const submit = (initialValues, dispatch) => {
      const values = R.assoc('date', moment(initialValues.date).utc().format('DD-MM-YYYY'), initialValues)
      return new Promise((resolve, reject) =>
         dispatch({
           type: types.GET_AVAILABLE_PHOTOGRAPHERS_REQUEST,
           payload: {
             values,
             resolve,
             reject
           }
         })
      ).catch(() => {})
    }

    const { handleSubmit } = this.props
    return (
      <div styleName="calendarPanelContainer">
        <div
          className={classNames(
            styles.selectPanelCalendar
          )}

          styleName={!this.state.first ? 'selectPanelLeftCalendar' : null}
          onClick={() => { this.handleActive(false) }}
        >
          <form onSubmit={handleSubmit(submit)} styleName="form">
            <div styleName="fields-wrapper">
              <div styleName="field-block">
                <div styleName="field-label">
                  PREFERRED DATE
                </div>
                <Field
                  name="date"
                  selected={moment().add(1, 'days')}
                  component={renderDatepicker}
                  onChange={this.handleFormSubmit}
                />
                <img
                  styleName="image-label"
                  role="presentation"
                  src={imagePath('/icons/calendar.svg')}
                />
              </div>
              {
              /* <div styleName="field-block timepicker-block">

                   <div styleName="field-label">
                    PREFERRED TIME
                  </div>
                  <Field
                    name="time"
                    holder="Type the time ..."
                    searchable
                    wrapperClassName="preffered-time-select"
                    component={renderSelect}
                    options={selectPhotographerInterval}
                    onChange={this.handleFormSubmit}
                  />
                  <img
                    styleName="image-label"
                    role="presentation"
                    src={imagePath('/icons/photographer-clock.svg')}
                  />
              </div>*/
                }
            </div>
            {
              <button
                type="submit"
                ref="buttonSubmit"
                styleName="submit-button"
              />
            }
          </form>
        </div>
        <div
          className={classNames(
            styles.selectPanelCalendar,
            styles.hovereable
          )}

          styleName={this.state.first ? 'selectPanelRightCalendar' : null}

          onClick={() => { this.handleActive(true) }}
        >
          <div styleName="field-label-big">
            FIRST AVAILABLE
          </div>
          <img
            styleName="image-label"
            role="presentation"
            src={imagePath('/icons/calendar.svg')}
          />
        </div>
        <span styleName="orCircle">or</span>
      </div>
    )
  }
}

function select(state) {
  return {
    order: state.placeOrder
  }
}

export default reduxForm({
  form: 'order-select-photographers',
  validate: formValidator,
  enableReinitialize: true,
  initialValues: {
    date: moment().add(1, 'day')
  }
})(connect(select)(cssModules(CalendarPanel,
  styles, { allowMultiple: true })))

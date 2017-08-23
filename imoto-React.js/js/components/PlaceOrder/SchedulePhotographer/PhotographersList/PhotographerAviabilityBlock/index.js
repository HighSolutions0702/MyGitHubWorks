import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import { renderSelect, renderTextArea } from 'utils/fieldRenderers'
import { Field } from 'redux-form'
import { connect } from 'react-redux'
import classNames from 'classnames'
import R from 'ramda'
import moment from 'moment'
import types from 'constants/actionTypes'
import Switch from 'components/shared/Switch'
import { imagePath } from 'utils/helpers'
import styles from './index.pcss'

class FirstAvailablePhotographerBlock extends Component {
  constructor(props) {
    super(props)
    this.changePhotographer = this.changePhotographer.bind(this)
  }

  changePhotographer(value) {
    const { dispatch, photographer } = this.props
    if (!value) {
      dispatch({ type: types.REMOVE_PHOTOGRAPHER_FROM_ORDER })
    } else {
      dispatch({ type: types.ADD_PHOTOGRAPHER_TO_ORDER, payload: photographer })
    }
  }

  render() {
    const {
      order,
      order: {
        showFirstAvailablePhotographer,
        chosenPhotographers
      },
      photographer,
      photographerIndex
    } = this.props
    const isPhotographerSelected = photographer.id === chosenPhotographers.id
    const options = photographer.available_ranges.map(item => {
      const label = item.split('..').reduce((acc, val, index) => (
        index ? `${acc} to ${moment(val).utc().format('h:mm a')}` : acc + moment(val).utc().format('h:mm a')), '')
      return {
        label,
        value: item
      }
    })
    const availabilityStatus = photographerIndex ? 'AVAILABLE' : 'FIRST AVAILABLE'

    return (
      <div>
        {
          !R.isEmpty(chosenPhotographers) && chosenPhotographers.id !== photographer.id ?
            null
          :
            <div
              styleName={
                classNames('block-wrapper')
              }
            >
              {
                showFirstAvailablePhotographer &&
                  <div>
                    <div styleName="block-title">
                      PREFERED PHOTOGRAPHER
                    </div>
                  </div>
              }
              {
                <div styleName="content">
                  <div styleName="content-block">
                    <div styleName="photographer-description">
                      <div styleName="photographer-photo">
                        <img
                          role="presentation"
                          src={photographer.avatar || imagePath('/user.svg')}
                        />
                      </div >
                      <div styleName="photographer-info">
                        <div styleName="photographer-name">
                          { `${photographer.first_name} ${photographer.last_name}` }
                        </div>
                        <div styleName="photographer-text">
                          { options.length ? availabilityStatus : 'UNAVAILABLE' }
                        </div>
                      </div>
                    </div>
                    <div styleName="photographer-date">
                      <img
                        role="presentation"
                        src={imagePath('/icons/product-page-clock.svg')}
                        styleName="clock-image"
                      />
                      { options.length ? 'AVAILABLE AT' : 'N/A' }
                    </div>
                  </div>
                  <div styleName="content-block">
                    <div styleName="photographer-timepicker">
                      {
                        options.length ?
                          <Field
                            name={`timeRange${photographer.id}`}
                            type="text"
                            wrapperClassName="photographer-time-select"
                            options={options}
                            component={renderSelect}
                          />
                        :
                          'Availave at a different time'
                      }
                      <img src={imagePath('icons/drop-down.png')} role="presentation" />
                    </div>
                    <div>
                      {
                        !!options.length &&
                          <Switch
                            value={isPhotographerSelected}
                            onChange={this.changePhotographer}
                          />
                      }
                    </div>
                  </div>
                </div>
              }
              {
                chosenPhotographers.id === photographer.id &&
                <div styleName="instruction-block">
                  <div styleName="instruction-label">
                    SPECIAL INSTRUCTIONS AND REQUESTS (Optional)
                  </div>
                  <Field
                    name="instruction"
                    simpleTextArea
                    fieldClassName="photographer-instruction"
                    component={renderTextArea}
                    type="text"
                  />
                </div>
              }
            </div>
        }
      </div>
    )
  }
}

export default connect()(cssModules(FirstAvailablePhotographerBlock,
  styles, { allowMultiple: true }))

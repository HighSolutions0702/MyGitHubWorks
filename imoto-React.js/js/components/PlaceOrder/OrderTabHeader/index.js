import React, { Component, PropTypes } from 'react'
import Button from 'components/shared/Button'
import types from 'constants/actionTypes'
import R from 'ramda'
import classNames from 'classnames'
import { imagePath } from 'utils/helpers'
import validate from 'validate.js'
import { connect } from 'react-redux'
import cssModules from 'react-css-modules'
import HelpModal from 'components/PlaceOrder/HelpModal'
import styles from 'components/PlaceOrder/index.pcss'

class OrderTabHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showHelp: false
    }
    this.handleEditClick = this.handleEditClick.bind(this)
    this.toggleHelp = this.toggleHelp.bind(this)
  }

  handleEditClick() {
    const { dispatch, tabStep } = this.props
    dispatch({ type: types.CHANGE_PLACE_ORDER_ACTIVE_STEP, payload: tabStep })
  }

  toggleHelp() {
    this.setState({
      showHelp: !this.state.showHelp
    })
  }

  render() {
    const { order: { activeStep, currentStep }, tabStep } = this.props

    return (
      <div styleName="block-header">
        <div styleName="main-header-info">
          <div styleName="step-number-block">
            {
              activeStep !== tabStep && currentStep > tabStep ?
                <div styleName="check-container">
                  <div styleName="check-container-helper">
                    <div styleName="initial-check" />
                    <div styleName="check-block">
                      <img
                        role="presentation"
                        src={imagePath('/icons/check.png')}
                        styleName="status-image"
                      />
                    </div>
                  </div>
                </div>
              :
                tabStep
            }
          </div>
          <div styleName="block-description">
            <div styleName="block-title">
              {(() => {
                switch (tabStep) {
                  case 1:
                    return 'Listing Details'
                  case 2:
                    return 'Select Products'
                  case 3:
                    return 'Schedule Photographer'
                  case 4:
                    return 'Payment Details'
                  default: return null
                }
              })()}
            </div>
            <div styleName="title-description">
              {(() => {
                switch (tabStep) {
                  case 1:
                    return 'Please enter the listing address and property info'
                  case 2:
                    return 'Please select your products.'
                  case 3:
                    return 'Please select a photographer, date and time below'
                  case 4:
                    return 'Please add your payment details.'
                  default: return null
                }
              })()}
            </div>
          </div>
        </div>
        {
          activeStep === tabStep ?
            <Button
              size="xsmall"
              color="white-gray"
              styleName={tabStep !== 1 && 'invisible'}
              onClick={this.toggleHelp}
            >
                Need help?
              </Button>
          :
            <div styleName="header-buttons-container">
              <div styleName="temp-header-button">
                <Button
                  size="xsmall"
                  color="white-gray"
                  styleName={tabStep !== 1 && 'invisible'}
                  onClick={this.toggleHelp}
                >
                  Need help?
                </Button>
              </div>
              <Button
                size="xsmall"
                type="button"
                color="white-gray"
                styleName={(tabStep === 3 && activeStep < 4) && 'invisible'}
                onClick={this.handleEditClick}
              >
                Edit
              </Button>
            </div>
        }
        <HelpModal
          toggleHelp={this.toggleHelp}
          show={this.state.showHelp}
        />
      </div>
    )
  }
}

OrderTabHeader.propTypes = {
  tabStep: PropTypes.number.isRequired
}

function select(state) {
  return {
    order: state.placeOrder
  }
}

export default connect(select)(cssModules(OrderTabHeader,
  styles, { allowMultiple: true }))

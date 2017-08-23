import React, { Component } from 'react'
import cssModules from 'react-css-modules'
import types from 'constants/actionTypes'
import { connect } from 'react-redux'
import OrderTabHeader from 'components/PlaceOrder/OrderTabHeader'
import R from 'ramda'
import CalendarPanel from './CalendarPanel'
import styles from './index.pcss'
import PhotographersList from './PhotographersList'

class SchedulePhotographer extends Component {
  componentDidMount() {
    const { dispatch, order } = this.props
    if (!order || R.isEmpty(order)) {
      dispatch({ type: types.GET_AVAILABLE_PHOTOGRAPHERS_REQUEST })
    }
  }

  render() {
    const { order: { activeStep }, order } = this.props
    return (
      <div styleName="schedule-photographer-block">
        <OrderTabHeader tabStep={3} />
        {
          activeStep === 3 &&
            <div>
              <CalendarPanel />
              <PhotographersList order={order} />
            </div>
        }
      </div>
    )
  }
}

function select(state) {
  return {
    order: state.placeOrder
  }
}

export default connect(select)(cssModules(SchedulePhotographer,
  styles, { allowMultiple: true }))

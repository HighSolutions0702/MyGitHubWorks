import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import $ from 'jquery'
import { compose, graphql } from 'react-apollo'
import { queries, mutations } from 'apollo'
import { imagePath } from 'utils/helpers'
import BigCalendar from 'react-big-calendar'

import GoogleLogin from 'react-google-login'
import config from 'constants/config'
import types from 'constants/actionTypes'

import Button from 'components/shared/Button'
import moment from 'moment'
import Ionicon from 'react-ionicons'
import SideBar from 'components/Photographer/SideBar'
import Header from 'components/Photographer/Calendar/Header'
import cssModules from 'react-css-modules'
import calstyles from './react-big-calendar.css'
import styles from './index.pcss'

class PhotographerCalendar extends Component {
  constructor(props) {
    super(props)
    this.responseGoogle = this.responseGoogle.bind(this)
    this.state = {}
  }

  responseGoogle(response) {
    this.props.mutate({
      variables: {
        access_token: response.accessToken,
        expires_at: response.tokenObj.expires_at
      }
    }).then(({ data }) => {
      this.setState({
        calendarEvents: data.SyncCalendar.calendar_items.map((event) => ({
          start: new Date(event.unavailable_from.replace(/\+\d+:\d+/, '')),
          end: new Date(event.unavailable_to.replace(/\+\d+:\d+/, '')),
          title: event.title,
          desc: event.description,
          google_calendar_event_id: event.google_calendar_event_id
        }))
      })
    }).catch((error) => {})
  }

  render() {
    const { child, path, data: { photographer, refetch } } = this.props
    const { photographerCalendarItemsQuery: { photographer_calendar_items: photographerCalendarItems } } = this.props
    const totalOrdersCount = photographer && photographer.total_orders_count
    const uploadedOrdersCount = photographer &&
      photographer.uploaded_orders_count
    const remainingOrderCount = totalOrdersCount - uploadedOrdersCount
    const photoShootTodayCount = photographer &&
      photographer.photo_shoot_today_count
    const photoShootCompletedCount = photographer &&
      photographer.photo_shoot_completed_count
    const remainingPhotoShootCount = photoShootTodayCount -
      photoShootCompletedCount
    const earnings = photographer && photographer.earnings.toFixed(2)

    BigCalendar.momentLocalizer(moment)

    const allViews = ['month', 'week', 'day']
    const formats = {
      timeGutterFormat: 'ha',
      dayFormat: 'ddd D',
      eventTimeRangeFormat: ' '
    }

    // Initial calendar events
    if (photographer && photographerCalendarItems && Object.keys(this.state).length === 0) {
      const photographersEvents = photographerCalendarItems.map((calendarEvent) => ({
        title: calendarEvent.title,
        desc: calendarEvent.description,
        start: new Date(calendarEvent.unavailable_from.replace(/\+\d+:\d+/, '')),
        end: new Date(calendarEvent.unavailable_to.replace(/\+\d+:\d+/, '')),
        google_calendar_event_id: calendarEvent.google_calendar_event_id
      }))

      this.setState({ calendarEvents: photographersEvents })
    }

    const minDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 8, 0)
    const maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 21, 0)
    const getCustomToolbar = (toolbar) => {
      const currentMonth = moment(toolbar.date).endOf('month').format('MMMM YYYY')

      this.toolbarDate = toolbar.date

      const goToDayView = () => {
        toolbar.onViewChange('day')
      }
      const goToWeekView = () => {
        toolbar.onViewChange('week')
      }
      const goToMonthView = () => {
        toolbar.onViewChange('month')
      }

      const goToCurrent = () => {
        const now = new Date()
        toolbar.date.setDate(now.getDate())
        toolbar.date.setMonth(now.getMonth())
        toolbar.date.setYear(now.getFullYear())
        goToDayView()
        toolbar.onNavigate('current')
      }
      const goToBack = () => {
        const mDate = toolbar.date
        let newDate = new Date()
        if (toolbar.view === 'month') {
          newDate = new Date(
              mDate.getFullYear(),
              mDate.getMonth() - 1
            )
        }
        if (toolbar.view === 'week') {
          newDate = new Date(
            mDate.getFullYear(),
            mDate.getMonth(),
            mDate.getDate() - 7
            )
        }
        if (toolbar.view === 'day') {
          newDate = new Date(
            mDate.getFullYear(),
            mDate.getMonth(),
            mDate.getDate() - 1
            )
        }
        toolbar.onNavigate('prev', newDate)
      }
      const goToNext = () => {
        const mDate = toolbar.date
        let newDate = new Date()
        if (toolbar.view === 'month') {
          newDate = new Date(
              mDate.getFullYear(),
              mDate.getMonth() + 1
            )
        }
        if (toolbar.view === 'week') {
          newDate = new Date(
            mDate.getFullYear(),
            mDate.getMonth(),
            mDate.getDate() + 7
            )
        }
        if (toolbar.view === 'day') {
          newDate = new Date(
            mDate.getFullYear(),
            mDate.getMonth(),
            mDate.getDate() + 1
            )
        }
        toolbar.onNavigate('next', newDate)
      }

      return (
        <div className="rbc-toolbar">

          <div className="rbc-toolbar-label-left">
            <button className="btn btn-back" onClick={goToBack} />
            <span>{currentMonth}</span>
            <button className="btn btn-next" onClick={goToNext} />

          </div>

          <div className="rbc-btn-group">
            <div>
              <Button
                size="xxnormal"
                type="button"
                color="white-gray"
                onClick={goToMonthView}
              >
                Month
              </Button>
              <Button
                size="xxnormal"
                color="white-gray"
                onClick={goToWeekView}
              >
                Week
              </Button>
              <Button
                size="xxnormal"
                type="button"
                color="white-gray"
                onClick={goToCurrent}
              >
                Today
              </Button>
            </div>

          </div>
        </div>
      )
    }

    const Event = (event) => (
      <div>
        <div style={{ color: '#111' }}>
          {event.title}
        </div>
        <div>
          {event.event.desc}
        </div>
      </div>
      )

    return (
      <div styleName="row">
        <div styleName="side-bar">
          <SideBar
            fullName={photographer && photographer.full_name}
            avatar={photographer && photographer.avatar}
          />
        </div>
        <div styleName="content">
          <div styleName="wrapper">
            <div styleName="wrapper-head-container">

              <span styleName="block-title">Calendar</span>

              <GoogleLogin
                clientId={config.GOOGLE_OAUTH_KEY}
                buttonText="Add GoogleCalendar events"
                onSuccess={this.responseGoogle}
                styleName="google-btn"
                scope="https://www.googleapis.com/auth/calendar"
              />

            </div>
            <div styleName="block-content">
              <BigCalendar
                {...this.props}
                events={this.state.calendarEvents || []}
                views={allViews}
                defaultView="week"
                formats={formats}
                min={minDate}
                max={maxDate}
                components={{
                  toolbar: getCustomToolbar,
                  event: Event
                }}
              />
            </div>
          </div>


        </div>
      </div>
    )
  }
}

export default compose(
  graphql(
    queries.getPhotographer, {
      options: {
        forceFetch: true,
        ssr: false,
        variables: {
          withCounts: true,
          withItems: true
        }
      }
    }),
  graphql(
    queries.getPhotographerCalendarItems, {
      options: {
        forceFetch: true,
        ssr: false
      },
      name: 'photographerCalendarItemsQuery'
    }),
  graphql(mutations.SyncCalendar)
)(cssModules(PhotographerCalendar, styles))

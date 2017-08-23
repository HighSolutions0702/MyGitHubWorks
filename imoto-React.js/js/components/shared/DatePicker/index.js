import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import './index.css'

const DateWithPicker = (props) => {
  const helper = () => moment(props.value).format() === 'Invalid date'
  return (
    <DatePicker
      onChange={props.onChange}
      onFocus={props.onFocus}
      selected={helper() ? undefined : props.value}
      showYearDropdown
      dateFormat="MMMM DD, YYYY"
      minDate={moment().add(1, 'days')}
    />
  )
}

export default DateWithPicker

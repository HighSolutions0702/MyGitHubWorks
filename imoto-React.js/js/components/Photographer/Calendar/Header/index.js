import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { imagePath } from 'utils/helpers'
import cssModules from 'react-css-modules'
import styles from './index.pcss'


class Header extends Component {
  render() {
    const CustomToolbar = (toolbar) => {
      const goToBack = () => {
        toolbar.date.setMonth(toolbar.date.getMonth() - 1)
        toolbar.onNavigate('prev')
      }

      const goToNext = () => {
        toolbar.date.setMonth(toolbar.date.getMonth() + 1)
        toolbar.onNavigate('next')
      }

      const goToCurrent = () => {
        const now = new Date()
        toolbar.date.setMonth(now.getMonth())
        toolbar.date.setYear(now.getFullYear())
        toolbar.onNavigate('current')
      }

      const label = () => {
        const date = toolbar.date
        return (
          <span><b>{date.format('MMMM')}</b><span> {date.format('YYYY')}</span></span>
        )
      }

      return (
        <div className={['toolbar-container']}>
          <div className={['label-date']}>{label()}</div>

          <div className={['back-next-buttons']}>
            <button className={['btn-back']} onClick={goToBack}>&#8249;</button>
            <button className={['btn-current']} onClick={goToCurrent}>today</button>
            <button className={['btn-next']} onClick={goToNext}>&#8250;</button>
          </div>
        </div>
      )
    }
    return CustomToolbar
  }
}

export default connect()(cssModules(Header, styles, { allowMultiple: true }))

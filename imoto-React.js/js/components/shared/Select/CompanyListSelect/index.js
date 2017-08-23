import React, { Component } from 'react'
import { connect } from 'react-redux'
import types from 'constants/actionTypes'
import { graphql } from 'react-apollo'
import { queries } from 'apollo'
import { renderSelectCreatable } from 'utils/fieldRenderers'
import { Field, change } from 'redux-form'

class CompanyListSelect extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
    this.onNewOptionClick = this.onNewOptionClick.bind(this)
    this.renderOption = this.renderOption.bind(this)
    this.renderValue = this.renderValue.bind(this)
    this.setOptions = this.setOptions.bind(this)
  }

  onChange(selected) {
    const { dispatch } = this.props
    if (selected) {
      const { data: { companies } } = this.props
      const choosedCompany = companies.filter(item => item.id === selected.value)[0]
      dispatch({ type: types.GET_COMPANY_BRANCHES_REQUEST, payload: choosedCompany.name })
      dispatch({
        type: types.SET_REGISTRATION_COMPANY,
        payload: choosedCompany
      })

      dispatch(change('registrationAgent', 'companyCity', ''))
      dispatch(change('registrationAgent', 'companyState', ''))
      dispatch(change('registrationAgent', 'companyZipCode', ''))
      dispatch(change('registrationAgent', 'companyWebsite', ''))
      dispatch(change('registrationAgent', 'companyLogo', ''))
    }
  }

  onNewOptionClick(option) {
    const { dispatch } = this.props
    dispatch({ type: types.RESET_REGISTRATION_COMPANY })
    const choosedCompany = { isNewCompany: true, name: option.value }
    dispatch({
      type: types.CREATE_NEW_PENDING_COMPANY,
      payload: choosedCompany
    })

    dispatch(change('registrationAgent', 'companyOfficeBranch', ''))
  }

  setOptions() {
    const { data: { companies } } = this.props
    return companies ? companies.map(item => (
      { label: item.name, value: item.id })) : null
  }

  renderOption(option) {
    return (
      <div>
        <span>{option.label}</span>
      </div>
    )
  }

  renderValue(option) {
    return this.renderOption(option)
  }

  render() {
    const options = this.setOptions()

    return (
      <div className="form-control">
        <Field
          name="companyName"
          holder="COMPANY NAME"
          searchable
          className="form-select"
          options={options}
          optionRenderer={this.renderOption}
          onChange={this.onChange}
          valueRenderer={this.renderValue}
          onNewOptionClick={this.onNewOptionClick}
          component={renderSelectCreatable}
          promptTextCreator={(input) => (`Create Company: ${input}`)}
        />
      </div>
    )
  }
}

function select(state) {
  return {
    currentCompany: state.choosedCompany
  }
}

export default graphql(queries.getCompaniesList)(connect(select)(CompanyListSelect))

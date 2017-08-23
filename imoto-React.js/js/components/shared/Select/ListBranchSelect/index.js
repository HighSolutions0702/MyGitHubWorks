import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import types from 'constants/actionTypes'
import { renderSelectCreatable } from 'utils/fieldRenderers'
import { Field, change } from 'redux-form'

class ListBranchSelect extends Component {
  constructor(props) {
    super(props)
    this.onNewOptionClick = this.onNewOptionClick.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onNewOptionClick(option) {
    const { dispatch, currentCompany } = this.props
    const choosedCompany = { isNewCompany: true, name: currentCompany.name }
    dispatch({ type: types.CREATE_NEW_PENDING_COMPANY, payload: choosedCompany })
    dispatch({
      type: 'redux-form/CHANGE',
      field: 'companyName',
      value: currentCompany.name,
      placeholder: currentCompany.name,
      form: 'registrationAgent'
    })
  }

  onChange(selected) {
    const { dispatch } = this.props
    if (selected) {
      const companies = _.toArray(this.props.companyBranches)
      const choosedCompany = _.find(companies, { id: selected.id })
      dispatch({
        type: types.SET_REGISTRATION_COMPANY,
        payload: choosedCompany
      })
    }
  }

  getOptions() {
    const { companyBranches } = this.props
    return companyBranches ? _.toArray(_.mapValues(companyBranches, (item) => ({ id: item.id, label: item.office_branch }))) : null
  }

  render() {
    const options = this.getOptions()

    return (
      <div className="form-control">
        <Field
          name="companyOfficeBranch"
          holder="OFFICE BRANCH"
          className="form-select"
          searchable
          options={options}
          optionRenderer={this.renderOption}
          valueRenderer={this.renderValue}
          onChange={this.onChange}
          onNewOptionClick={this.onNewOptionClick}
          component={renderSelectCreatable}
          promptTextCreator={(input) => (`Create Branch: ${input}`)}
        />
      </div>
    )
  }
}

function select(state) {
  return {
    currentCompany: state.choosedCompany,
    companyBranches: state.companyBranches
  }
}

export default connect(select)(ListBranchSelect)

import React, { Component } from 'react'
import AccountForm from './AccountForm'

class AccountDetails extends Component {
  render() {
    const { customer, refetch } = this.props

    return (
      <AccountForm
        initialValues={{
          fullName: (customer && customer.full_name),
          email: (customer && customer.email),
          password: null,
          passwordConfirmation: null,
          personalWebsite: null,
          mobile: (customer && customer.mobile),
          companyName: (customer && customer.company && customer.company.name),
          officeBranch: (customer && customer.company && customer.company.office_branch),
          city: (customer && customer.company && customer.company.city),
          state: (customer && customer.company && customer.company.state),
          zipCode: (customer && customer.company && customer.company.zip_code),
          companyWebsite: (customer && customer.company && customer.company.website),
          secondEmail: (customer && customer.second_email),
          thirdEmail: (customer && customer.third_email),
          fourthEmail: (customer && customer.fourth_email),
          creditCards: (customer && customer.credit_cards)
        }}
        refetch={refetch}
        profileType={customer && customer.role}
      />
    )
  }
}

export default AccountDetails

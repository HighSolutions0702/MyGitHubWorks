import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { queries } from 'apollo'
import AccountForm from 'components/Photographer/AccountDetails/AccountForm'

class PhotographerAccountDetails extends Component {
  render() {
    const { data: { photographer, refetch } } = this.props
    let initialValues = {}

    if (photographer) {
      initialValues = {
        firstName: photographer.first_name,
        lastName: photographer.last_name,
        fullName: photographer.full_name,
        avatar: photographer.avatar,
        email: photographer.email,
        phone: photographer.phone
      }
    }

    return (
      <AccountForm
        initialValues={initialValues}
        refetch={refetch}
      />
    )
  }
}

export default graphql(
  queries.getPhotographer, {
    options: {
      forceFetch: true,
      ssr: false
    }
  },
)(PhotographerAccountDetails)

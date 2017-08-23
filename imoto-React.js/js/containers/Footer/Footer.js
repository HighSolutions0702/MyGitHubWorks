import React, { Component } from 'react'
import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class Footer extends Component {
  render() {
    return (
      <div>
        Footer
      </div>
    )
  }
}

export default connect()(Footer)

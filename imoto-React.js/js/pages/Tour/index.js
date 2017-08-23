import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import VirtualTour from 'components/VirtualTour'
import { imagePath } from 'utils/helpers'

class VirtualTourPage extends Component {
  render() {
    const plans = [
      {
        src: imagePath('floor-plan.png'),
        title: 'image title'
      },
      {
        src: imagePath('floor-plan-2.png'),
        title: 'image title'
      },
      {
        src: imagePath('floor-plan.png'),
        title: 'image title'
      }
    ]
    return (
      <VirtualTour
        videos={['jtTBnsi_sDM', 'NWZ9ZonHjAQ']}
        videoBackground={imagePath('bg-1.jpg')}
        order={this.props.data.order}
        plans={plans}
      />
    )
  }
}

export default graphql(
  gql`
    query ($slug: String!) {
      order(slug: $slug) {
        address
        second_address
        city
        state
        zip_code
        listing_description
        listing_price
        square_footage
        number_of_beds
        number_of_baths
        customer {
          company {
            name
            website
          }
          full_name
          mobile
          email
        }
      }
    }
  `, { options: (ownProps) => ({ variables: { slug: ownProps.params.orderId } }) })(VirtualTourPage)

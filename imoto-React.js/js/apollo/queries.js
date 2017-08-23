import gql from 'graphql-tag'

export const getPhotographer = gql`
  query (
    $withCounts: Boolean = false
  ) {
    photographer {
      id
      first_name
      last_name
      full_name
      avatar
      email
      phone
      total_orders_count @include(if: $withCounts)
      uploaded_orders_count @include(if: $withCounts)
      photo_shoot_today_count @include(if: $withCounts)
      photo_shoot_completed_count @include(if: $withCounts)
      earnings @include(if: $withCounts)
      errors
    }
  }
`

export const getPhotographerOrders = gql`
  query {
    photographer_orders {
      id,
      status,
      zip_code,
      city,
      address,
      customer {
        full_name,
        avatar
      },
      order_attributes {
        id
        quantity
        name
        price
      }
    }
  }
`

export const getPhotographerCalendarItems = gql`
  query {
    photographer_calendar_items {
      unavailable_from
      unavailable_to
      google_calendar_event_id
      title
      description
    }
  }
`

export const getCustomer = gql`
  query {
    customer {
      id
      full_name
      email
      mobile
      website
      second_email
      third_email
      status
      role
      errors
      avatar
      company {
        name
        office_branch
        city
        state
        zip_code
        website
        logo
        errors
      }
      credit_cards {
        id
        number
        holder_name
        expiration_date
        created_at
      }
    }
  }
`
export const getOrdersList = gql`
  query {
    customer_orders {
      address
      city
      id
      slug
      listing_description
      listing_price
      number_of_baths
      number_of_beds
      second_address
      square_footage
      state
      status
      step
      zip_code
    }
  }
`

export const getOrder = ({ id }) => gql`
  query (
    $withAttachments: Boolean = false
  ) {
    order(id:${id}){
      address
      city
      id
      listing_description
      listing_price
      number_of_baths
      number_of_beds
      second_address
      square_footage
      current_step
      active_step
      state
      state_code
      status
      step
      zip_code
      order_attributes {
        id
        quantity
        name
        price
        data
        attribute_item {
          data
        }
        photographer_attachments @include(if: $withAttachments) {
          attachment
          attachment_content_type
          md5
          key
          name
        }
      }
    }
  }
`

export const getCreditCards = gql`
  query {
    credit_cards {
      id
      number
      expiration_date
      created_at
    }
  }
`

export const getCurrentOrder = ({ id }) => gql`
  query {
    order(id: ${id}) {
      address
      city
      id
      listing_description
      listing_price
      number_of_baths
      number_of_beds
      second_address
      square_footage
      current_step
      active_step
      state
      status
      step
      zip_code
      coupon {
        discount_amount
        discount_type
        id
        minimum_purchase
        name
      }
      products {
        id
        selected_order_attributes {
          attribute_item_id
          data
          document
          name
          order_id
          price
          kind
          quantity
        }
      }
    }
  }
`

export const getOrderProducts = ({ id }) => gql`
  query {
    order(id: ${id}) {
      id
      products {
        id
        name
        description
        image
        attribute_items {
          additional_price
          base_price
          base_quantity
          company_id
          data
          id
          kind
          parent_id
          product {
            id
          }
        }
        selected_order_attributes {
          attribute_item_id
          data
          document
          kind
          name
          order_id
          price
          quantity
        }
      }
    }
  }
`

export const getAvailablePhotographers = ({ orderId, date, time }) => {
  const dateForQuery = date ? `date: "${date}"` : ''
  const timeForQuery = time ? `time: "${time}"` : ''

  return gql`
  query {
    available_photographers(
      order_id: ${orderId}
      ${dateForQuery}
      ${timeForQuery}
    ) {
      id,
      avatar,
      available_ranges,
      email,
      first_name,
      last_name,
      created_at
    }
  }
`
}

export const getCompaniesList = gql`
  query {
    companies {
      id
      name
      office_branch
      city
      state
      zip_code
      website
      logo
    }
  }
`

export const productsWithAttributes = gql`
  query {
    products_with_attributes {
      attribute_items {
        additional_price
        base_price
        base_quantity
        company_id
        data
        id
        kind
        parent_id
        product {
          id
        }
      }
      category {
        id
        name
      }
      description
      id
      name
      image
    }
  }
`

export const getCompanyBranches = ({ companyName }) => gql`
  query {
    company_branches(company_name: "${companyName}") {
      id
      name
      city
      state
      website
      zip_code
      office_branch
      logo
    }
  }
`

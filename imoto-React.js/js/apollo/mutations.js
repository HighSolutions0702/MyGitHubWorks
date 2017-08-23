import gql from 'graphql-tag'

export const CreateAgent = gql`
  mutation(
    $role: String!,
    $fullName: String!,
    $email: String!,
    $password: String!,
    $passwordConfirmation: String!,
    $mobile: String!,
    $personalWebsite: String,
    $avatar: String,
    $secondEmail: String,
    $thirdEmail: String,
    $companyId: ID
  ) {
    CreateCustomer (
      input: {
        role: $role,
        full_name: $fullName,
        email: $email,
        password: $password,
        password_confirmation: $passwordConfirmation,
        mobile: $mobile,
        website: $personalWebsite,
        avatar: $avatar,
        second_email: $secondEmail,
        third_email: $thirdEmail,
        company_id: $companyId
      }
    ) {
      customer {
        email,
        errors,
        id
      }
    }
  }
`

export const CreateHomeowner = gql`
  mutation(
    $role: String!,
    $fullName: String!,
    $email: String!,
    $password: String!,
    $passwordConfirmation: String!,
    $mobile: String!,
    $personalWebsite: String,
    $avatar: String,
    $secondEmail: String,
    $thirdEmail: String,
  ) {
    CreateCustomer (
      input: {
        role: $role,
        full_name: $fullName,
        email: $email,
        password: $password,
        password_confirmation: $passwordConfirmation,
        mobile: $mobile,
        website: $personalWebsite,
        avatar: $avatar,
        second_email: $secondEmail,
        third_email: $thirdEmail,
      }
    ) {
      customer {
        email,
        errors,
        id
      }
    }
  }
`

export const SignInUser = gql`
  mutation(
    $email: String!,
    $password: String!,
    $rememberMe: Boolean
  ) {
    SignInUser (
      input: {
        email: $email,
        password: $password,
        remember_me: $rememberMe
      }
    ) {
      user {
        email,
        errors,
        role,
        id
      }
    }
  }
`

export const SendResetPasswordInstruction = gql`
  mutation(
    $email: String!
  ) {
    SendResetPasswordInstruction (
      input: {
        email: $email
      }
    ) {
      customer {
        email,
        errors,
        id
      }
    }
  }
`

export const ResetPassword = gql`
  mutation(
    $resetPasswordToken: String!,
    $password: String!,
    $passwordConfirmation: String!
  ) {
    ResetPassword (
      input: {
        reset_password_token: $resetPasswordToken,
        password: $password,
        password_confirmation: $passwordConfirmation
      }
    ) {
      customer {
        email,
        errors,
        id
      }
    }
  }
`

export const UpdatePhotographer = gql`
  mutation updatePhotographer(
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $password: String,
    $passwordConfirmation: String,
    $phone: String!
  ) {
    UpdatePhotographer (
      input: {
        first_name: $firstName,
        last_name: $lastName,
        email: $email,
        phone: $phone,
        password: $password,
        password_confirmation: $passwordConfirmation
      }
    ) {
     photographer {
       id
       full_name
       avatar
       email
       phone
       errors
      }
    }
  }
`

export const UpdateCustomer = gql`
  mutation updateCustomer(
    $fullName: String!,
    $email: String!,
    $password: String,
    $passwordConfirmation: String,
    $mobile: String!,
    $personalWebsite: String,
    $secondEmail: String,
    $thirdEmail: String,
    $companyName: String,
    $city: String,
    $officeBranch: String,
    $state: String,
    $companyWebsite: String,
    $zipCode: String
  ) {
      UpdateCustomer (
      input: {
        full_name: $fullName,
        email: $email,
        password: $password,
        password_confirmation: $passwordConfirmation,
        mobile: $mobile,
        website: $personalWebsite,
        second_email: $secondEmail,
        third_email: $thirdEmail,
        company: {
          name: $companyName
          city: $city,
          office_branch: $officeBranch,
          website: $companyWebsite,
          state: $state,
          zip_code: $zipCode
        }
      }
    ) {
      customer {
        avatar,
        email,
        full_name,
        id,
        mobile,
        second_email,
        third_email,
        website,
        errors,
        company {
          id,
          logo,
          name,
          city,
          office_branch,
          state,
          website,
          zip_code
        }
      }
    }
  }
`
export const SignOutCustomer = gql`
  mutation {
    SignOutCustomer(
      input: {}
    ) {
      id
    }
  }
`
export const SignOutPhotographer = gql`
  mutation {
      SignOutPhotographer(
      input: {}
    ) {
      id
    }
  }
`
export const InitialEmptyOrder = gql`
  mutation {
    InitialEmptyOrder(
      input: {}
    ) {
      order {
        id
      }
    }
  }
`

export const ListingOrderDetails = gql`
  mutation(
    $id: ID!
    $address: String!,
    $secondAddress: String,
    $city: String!,
    $state: String!,
    $zipCode: String!,
    $listingPrice: String!,
    $squareFootage: String!,
    $numberOfBeds: String!,
    $currentStep: String,
    $activeStep: String,
    $numberOfBaths: String!,
    $listingDescription: String
  ) {
    ListingOrderDetails(
      input: {
        id: $id,
        address: $address,
        second_address: $secondAddress,
        city: $city,
        state: $state,
        zip_code: $zipCode,
        current_step: $currentStep,
        active_step: $activeStep,
        listing_price: $listingPrice,
        square_footage: $squareFootage,
        number_of_beds: $numberOfBeds,
        number_of_baths: $numberOfBaths,
        listing_description: $listingDescription
      }
    ) {
      order {
        id
      }
    }
  }
`
export const PhotographerOrderDetails = gql`
  mutation(
    $orderId: ID!,
    $photographerId: ID!,
    $timeRange: String!,
    $activeStep: String,
    $currentStep: String
  ) {
    PhotographerOrderDetails(
      input: {
        order_id: $orderId,
        photographer_id: $photographerId,
        time_range: $timeRange,
        active_step: $activeStep,
        current_step: $currentStep
      }
    ) {
      order {
        id
      }
    }
  }
`
export const ProductOrderDetails = gql`
  mutation(
    $orderId: ID!
    $currentStep: String,
    $activeStep: String,
    $attributes: [AttributeInput]
  ) {
    ProductOrderDetails(
      input: {
        order_id: $orderId,
        current_step: $currentStep,
        active_step: $activeStep,
        attributes: $attributes
      }
    ) {
      order {
        address
        city
        id
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
        coupon {
          discount_amount
          discount_type
          id
          minimum_purchase
          name
        }
        order_attributes {
          data
          id
          name
          order_id
          attribute_item_id
          price
          quantity
        }
      }
    }
  }
`
export const AddDiscountCode = gql`
  mutation(
    $orderId: ID!,
    $discountCode: String!
  ) {
    ApplyDiscountCode (
      input: {
        order_id: $orderId,
        code: $discountCode
      }
    ) {
      order {
        coupon {
          discount_amount
          discount_type
          minimum_purchase
        }
      }
    }
  }
`
export const ZipcodeValidation = gql`
  mutation(
    $value: String!,
    $stateName: String!
  ) {
    ZipcodeValidation (
      input: {
        value: $value,
        state_name: $stateName
      }
    ) {
      status
    }
  }
`

export const UpdateStatus = gql`
  mutation(
      $orderId: ID!,
      $status: String!
  ){
      UpdateStatus(
          input:{
              order_id: $orderId,
              status: $status
          }
      ){
          status
      }
  }
`

export const UploadPhoto = gql`
  mutation(
      $orderProductId: ID!,
      $photo:String!
  ){
      UploadPhoto(
          input:{
              order_attribute_id:$orderProductId,
              photo:$photo
          }
      ){
        photo {
          bucket
          key
          name
          md5
       }
      }
  }
`

export const CreateCalendarItems = gql`
  mutation(
    $calendarItems: [CalendarItemInput]!
  ) {
    CreateCalendarItems (
      input:{
        calendar_items: $calendarItems
      }
    ) {
      calendar_items {
        id
      }
    }
  }
`

export const CreateCompany = gql`
  mutation (
    $companyName: String!,
    $companyOfficeBranch: String!,
    $companyCity: String,
    $companyState: String,
    $companyZipCode: String,
    $companyWebsite: String,
    $logo: String
  ) {
    CreateCompany (
      input: {
        name: $companyName,
        office_branch: $companyOfficeBranch,
        city: $companyCity,
        state: $companyState,
        zip_code: $companyZipCode,
        website: $companyWebsite,
        logo: $logo
      }
    ) {
      company {
        id
        name
        office_branch
      }
    }
}
`

export const SyncCalendar = gql`
  mutation(
    $access_token: String!,
    $expires_at: Int!
  ) {
    SyncCalendar (
      input:{
        access_token: $access_token,
        expires_at: $expires_at
      }
    ) {
      calendar_items {
        unavailable_from
        unavailable_to
        google_calendar_event_id
        title
        description
      }
    }
  }
`

export const CreatePaymentTransaction = gql`
  mutation (
    $cardHolder: String!,
    $cardNumber: String!,
    $expirationDate: String!,
    $cvv: String!,
    $amount: Float!,
    $isSaveCard: Boolean,
    $acceptTerms: Boolean!
  ) {
    CreatePaymentTransaction (
      input: {
        card_holder: $cardHolder,
        card_number: $cardNumber,
        card_expiration_date: $expirationDate,
        card_cvv: $cvv,
        amount: $amount,
        is_save_card: $isSaveCard,
        accept_terms: $acceptTerms
      }
    ) {
      payment_transaction {
        id
        amount
        status
        error_message
        error_code
      }
    }
  }
`

export const CreateCreditCard = gql`
  mutation (
    $number: String!,
    $cvv: String!,
    $expirationDate: String!,
    $holderName: String,
    $holderAddress: String,
    $holderCity: String,
    $holderState: String,  
    $holderZip: String  
  ) {
    CreateCreditCard(
      input: {
        number: $number,
        cvv: $cvv,
        expiration_date: $expirationDate,
        holder_name: $holderName,
        holder_address: $holderAddress,
        holder_city: $holderCity,
        holder_state: $holderState,
        holder_zip_code: $holderZip  
      }
    ) {
      credit_card {
        id
        holder_name
        expiration_date
        number
        errors
      }
    }
  }
`

export const DeleteCreditCard = gql`
  mutation (
    $id: ID!
  ) {
    DeleteCreditCard (
      input: {
        id: $id
      }
    ) {
      credit_card {
        id
        holder_name
        expiration_date
        number
        errors
      }
    }
  }
`

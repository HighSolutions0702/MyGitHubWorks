export const email = {
  presence: true,
  email: { message: 'must be valid' }
}
 /*eslint-disable  */
export const extraEmail = {
  format: {
    pattern: /(^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)?/,
    message: 'must be valid'
  }
}
 /*eslint-enable  */
export const otherEmail = {
  equality: {
    attribute: 'email',
    message: 'is not different',
    comparator(firstEmail, secondEmail) {
      return firstEmail !== secondEmail
    }
  }
}

export const password = {
  presence: true,
  length: {
    minimum: 6,
    message: 'must be at least 6 characters'
  }
}

export const cvv = {
  presence: true,
  length: {
    is: 3,
    message: 'must be 3 digit'
  }
}

export const expirationDate = {
  presence: true,
  length: {
    is: 7,
    message: 'must be valid'
  }
}

export const passwordConfirmation = {
  presence: true,
  equality: 'password'
}

export const passwordOptional = {
  length: {
    minimum: 6,
    message: 'must be at least 6 characters'
  }
}

export const passwordConfirmationOptional = {
  passwordConfirmationOptional: true
}

export const accountActivation = {
  presence: true,
  format: {
    pattern: /^\d{6}$/,
    message: 'Please, enter valid activation code'
  }
}

export const numberValue = {
  presence: true,
  format : {
    pattern: /^\+?(|[1-9]\d*)$/,
    message: '- incorrect, enter valid value'
  }
}

export const zipCode = {
  presence: true,
  format : {
    pattern: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
    message: '- incorrect, enter valid value'
  }
}

/*eslint-disable  */
export const cardNumber = {
  presence: true,
  length: {
    minimum: 16,
    message: 'must be at least 13 characters'
  }
}

export const cvv2 = {
  presence: true,
  format : {
    pattern: /^[0-9]{3,4}$/,
    message: '- incorrect, enter valid value'
  }
}

export const owner = {
  presence: true,
  format : {
    pattern: /^[a-zA-Z-'. ]+$/,
    message: '- incorrect, enter valid value'
  }
}
/*eslint-enable  */

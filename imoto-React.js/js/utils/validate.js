import validate from 'validate.js'

validate.validators.passwordConfirmationOptional = (value, options, key, attributes) => {
  if (attributes && value !== attributes.password) {
    return 'should match password'
  }
  return null
}

export default validate

module.exports = `
  type Mutation {
    createUser(
      name: String!,
      email: String!,
      password: String!,
      passwordConfirmation: String!,
      mobile: String!,
      personalWebsite: String,
      secondEmail: String,
      thirdEmail: String,
      fourthEmail: String,
      companyName: String!,
      officeBranch: String!,
      city: String!,
      state: String!,
      zipCode: String!,
      companyWebsite: String!,
      recaptcha: String!,
      rememberMe: Boolean!
    ): User,

    loginUser(
      email: String!,
      password: String!,
      rememberMe: Boolean!
    ): User

    updateUser(
      name: String!,
      email: String!,
      password: String,
      passwordConfirmation: String,
      mobile: String!,
      personalWebsite: String,
      secondEmail: String,
      thirdEmail: String,
      fourthEmail: String,
      companyName: String!,
      officeBranch: String!,
      city: String!,
      state: String!,
      zipCode: String!,
      companyWebsite: String!
    ): User

    logoutUser: Boolean
  }
`

module.exports = `
  type Company {
    name: String!,
    officeBranch: String!,
    city: String!,
    state: String!,
    zipCode: String!,
    website: String!
  }

  type User {
    id: ID!,
    name: String!
    email: String!,
    mobile: String!,
    website: String,
    secondEmail: String,
    thirdEmail: String,
    fourthEmail: String,
    company: Company
  }

  type Order {
    id: Int!,
    address: String!,
    date: String!,
    status: String!
  }
`

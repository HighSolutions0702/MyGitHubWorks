const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const tools = require('graphql-tools')
const casual = require('casual')
const graphqlHTTP = require('express-graphql')
const cookieParser = require('cookie-parser')

const { types, queries, mutations } = require('./schemas')

const schemaString = [`
  ${types}
  ${queries}
  ${mutations}

  schema {
    query: Query
    mutation: Mutation
  }
`]

const resolvers = {
  Query: {
    user(root, args, context) {
      console.log('context.req.cookies', context.req.cookies)

      if (context.req.cookies.token !== 'imoto-secret-auth-token') {
        throw new Error('You have no access to this data')
      }
    },
    orders(root, args, context) {
      if (context.req.cookies.token !== 'imoto-secret-auth-token') {
        throw new Error('You have no access to this data')
      }
    }
  },
  Mutation: {
    createUser(root, args, context) {
      const expiryDate = new Date()
      expiryDate.setMonth(expiryDate.getMonth() + 1)
      const expires = args.rememberMe ? `Expires=${expiryDate}` : ''

      context.res.set('Set-Cookie', `token=imoto-secret-auth-token; ${expires}`)
    },
    loginUser(root, args, context) {
      const expiryDate = new Date()
      expiryDate.setMonth(expiryDate.getMonth() + 1)
      const expires = args.rememberMe ? `Expires=${expiryDate}` : ''

      context.res.set('Set-Cookie', `token=imoto-secret-auth-token; ${expires}`)
    },
    updateUser(root, args, context) {
      if (context.req.cookies.token !== 'imoto-secret-auth-token') {
        throw new Error('You are not allowed to perform this request')
      }
    },
    logoutUser(root, args, context) {
      if (context.req.cookies.token !== 'imoto-secret-auth-token') {
        throw new Error('You are not allowed to perform this request')
      }

      context.res.set('Set-Cookie', `token=; ${new Date(0)}`)
    }
  }
}

const schema = tools.makeExecutableSchema({ typeDefs: schemaString, resolvers })
tools.addMockFunctionsToSchema({
  schema,
  mocks: {
    User: () => ({
      name: casual.name,
      email: casual.email,
      mobile: casual.phone,
      website: casual.url,
      secondEmail: casual.email,
      thirdEmail: casual.email,
      fourthEmail: casual.email
    }),
    Company: () => ({
      name: casual.company_name,
      officeBranch: casual.word,
      city: casual.city,
      state: casual.state,
      zipCode: casual.zip(5),
      website: casual.url
    }),
    Order: () => ({
      id: casual.integer(0, 1000),
      address: casual.address1,
      date: casual.date('MM/DD/YY'),
      status: casual.random_element(['pending', 'ready'])
    })
  },
  preserveResolvers: true
})

const PORT = 4000
const app = express()

const whitelist = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://imoto.jetru.by'
]

const corsOptions = {
  origin(domain, callback) {
    callback(null, whitelist.indexOf(domain) > -1)
  },
  headers: 'Origin, X-Requested-With, Content-Type, Accept',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}

app.options('*', cors(corsOptions)) // Preflight
app.use(cors(corsOptions))

app.use(morgan('combined'))
app.use(cookieParser())

app.use('/graphql', bodyParser.json(), (req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return next()
  }
  return graphqlHTTP({
    schema,
    graphiql: true,
    context: { req, res }
  })(req, res)
})

app.listen(PORT)

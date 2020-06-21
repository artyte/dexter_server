export const type = `
type Auth {
  username: ID!
  token: String!
  expiration: Int!
}

type User {
  date: String
  update: String
  username: String!
  email: String
}
`

export const input = `
input UserInput {
  username: String!
  password: String!
}
`

export const query = `
  login(username: String!, password: String!): Auth!
`

export const mutation = `
  signup(user: UserInput): Auth!
`
import graphql from 'graphql'
const { buildSchema } = graphql
import * as user from './user.js'
import * as monster from './monster.js'
import * as team from './team.js'

export default buildSchema(`
  ${user.type}
  ${user.input}

  ${monster.type}
  ${monster.input}

  ${team.type}
  ${team.input}

  type Query {
    hello: String
    ${user.query}
    ${monster.query}
    ${team.query}
  }

  type Mutation {
    ${user.mutation}
    ${monster.mutation}
    ${team.mutation}
  }
`)
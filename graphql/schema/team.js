export const type = `
type Team {
  _id: ID!
  date: String
  update: String
  compName: String
  firstMon: Monster
  secondMon: Monster
  thirdMon: Monster
  fourthMon: Monster
  fifthMon: Monster
  sixthMon: Monster
  user: User!
}

type DeletedTeam {
  compName: String
  date: String
}
`

export const input = `
`

export const query = `
  teams(team: ID): [Team!]
`

export const mutation = `
  deleteTeam(team: ID!): DeletedTeam!
  swapMonster(team: ID!, monsterAiD: ID!, monsterBiD: ID!): Team!
  newTeam: Team!
`
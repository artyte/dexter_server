export const type = `
type Monster {
  _id: ID!
  date: String
  update: String
  name: String!
  nickname: String
  moveOne: String
  moveTwo: String
  moveThree: String
  moveFour: String
  ability: String
  nature: String
  heldItem: String
  happiness: Int
  level: Int!
  gender: String
  isShiny: Boolean!
  hpEV: Int
  hpIV: Int
  attackEV: Int
  attackIV: Int
  defenseEV: Int
  defenseIV: Int
  spAttackEV: Int
  spAttackIV: Int
  spDefenseEV: Int
  spDefenseIV: Int
  speedEV: Int
  speedIV: Int
  team: Team!
}

type DeletedMonster {
  name: String
  compName: String
  date: String
}
`

export const input = `
input MonsterInput {
  id: ID
  name: String!
  nickname: String
  moveOne: String
  moveTwo: String
  moveThree: String
  moveFour: String
  ability: String
  nature: String
  heldItem: String
  happiness: Int
  level: Int!
  gender: String
  isShiny: Boolean!
  hpEV: Int
  hpIV: Int
  attackEV: Int
  attackIV: Int
  defenseEV: Int
  defenseIV: Int
  spAttackEV: Int
  spAttackIV: Int
  spDefenseEV: Int
  spDefenseIV: Int
  speedEV: Int
  speedIV: Int
  team: String
}
`

export const query = `
`

export const mutation = `
  addMonToTeam(monster: MonsterInput!): Monster!
  editMonToTeam(monster: MonsterInput!): Monster!
  deleteMonster(monster: ID!): DeletedMonster!
`
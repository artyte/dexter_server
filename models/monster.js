import mongoose from 'mongoose'
const Object = mongoose.Schema.Types.ObjectId

const monsterSchema = new mongoose.Schema({
  // _id: {
  //   type: Object,
  //   required: true
  // },
  date: {
    type: Date,
    required: true
  },
  update: {
    type: Date,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: false
  },
  moveOne: {
    type: String,
    required: false
  },
  moveTwo: {
    type: String,
    required: false
  },
  moveThree: {
    type: String,
    required: false
  },
  moveFour: {
    type: String,
    required: false
  },
  ability: {
    type: String,
    required: false
  },
  nature: {
    type: String,
    required: false
  },
  heldItem: {
    type: String,
    required: false
  },
  happiness: {
    type: Number,
    required: false
  },
  level: {
    type: Number,
    required: true
  },
  gender: {
    type: Number,
    required: false
  },
  isShiny: {
    type: Boolean,
    required: true
  },
  hpEV: {
    type: Number,
    required: false
  },
  hpIV: {
    type: Number,
    required: false
  },
  attackEV: {
    type: Number,
    required: false
  },
  attackIV: {
    type: Number,
    required: false
  },
  defenseEV: {
    type: Number,
    required: false
  },
  defenseIV: {
    type: Number,
    required: false
  },
  spAttackEV: {
    type: Number,
    required: false
  },
  spAttackIV: {
    type: Number,
    required: false
  },
  spDefenseEV: {
    type: Number,
    required: false
  },
  spDefenseIV: {
    type: Number,
    required: false
  },
  speedEV: {
    type: Number,
    required: false
  },
  speedIV: {
    type: Number,
    required: false
  },
  team: {
    type: Object,
    ref: `Team`,
    required: true
  },
  user: {
    type: Object,
    ref: `User`,
    required: true
  }
})

export default mongoose.model(`Monster`, monsterSchema)
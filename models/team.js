import mongoose from 'mongoose'
const Object = mongoose.Schema.Types.ObjectId

const teamSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  update: {
    type: Date,
    required: true
  },
  compName: {
    type: String,
    required: false
  },
  firstMon: {
    type: Object,
    ref: `Monster`,
    required: false
  },
  secondMon: {
    type: Object,
    ref: `Monster`,
    required: false
  },
  thirdMon: {
    type: Object,
    ref: `Monster`,
    required: false
  },
  fourthMon: {
    type: Object,
    ref: `Monster`,
    required: false
  },
  fifthMon: {
    type: Object,
    ref: `Monster`,
    required: false
  },
  sixthMon: {
    type: Object,
    ref: `Monster`,
    required: false
  },
  user: {
    type: Object,
    ref: `User`
  }
})

export default mongoose.model(`Team`, teamSchema)
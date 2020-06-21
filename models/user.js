import mongoose from 'mongoose'
import validator from 'validator'

const userSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  update: {
    type: Date,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    validate: value => {
      return validator.isEmail(value)
    }
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false,
    validate: value => {
      return validator.isEmail(value)
    }
  }
})

export default mongoose.model(`User`, userSchema)
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  countries: {
    type: Array,
  }
}, { collection: 'user' })

const User = mongoose.model('User', schema)

export default User
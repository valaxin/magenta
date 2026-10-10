import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      unique: false,
      required: false,
    },
  }
)

export default model('User', userSchema)
import { Schema, model } from 'mongoose'

const schema = new Schema(
  {},
  {
    versionKey: false,
    timestamps: true,
  },
)

export default model('blogs', schema)

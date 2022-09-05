import mongoose from 'mongoose'

const eaterySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      require: true,
      trim: true,
    },
  },
  // mongoose schema options
  // https://mongoosejs.com/docs/guide.html#options
  {
    timestamps: true,
  }
)

export const Eatery = mongoose.model('Eatery', eaterySchema)

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
      required: true,
      trim: true,
    },
    priceRange: {
      type: String,
      enum: ['CHEAP', 'AVERAGE', 'EXPENSIVE'],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  // mongoose schema options
  // https://mongoosejs.com/docs/guide.html#options
  {
    timestamps: true,
  }
)

export const Eatery = mongoose.model('Eatery', eaterySchema)

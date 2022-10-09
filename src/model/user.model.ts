import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      // MongoServerError will be thrown if we attempt to save() with duplicate username
      unique: true,
      minLength: 3,
      maxLength: 12,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      required: true,
    },
    eateries: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Eatery',
      },
    ],
  },
  {
    timestamps: true,
  }
)

export const User = mongoose.model('User', userSchema)

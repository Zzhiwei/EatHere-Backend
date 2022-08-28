import mongoose from "mongoose";

// enum priceRange = {
// }

const foodPlaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: Boolean,
      require: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("FoodPlace", foodPlaceSchema);

module.exports = Task;

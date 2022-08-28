import mongoose from "mongoose";

console.log({ url: process.env.MONGODB_URI });
const url = process.env.MONGODB_URI;

console.log("connecting to", url);
mongoose
  .connect(url || "")
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

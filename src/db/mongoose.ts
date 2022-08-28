import mongoose from "mongoose";

const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cs3219.znysiko.mongodb.net/?retryWrites=true&w=majority`;

console.log("connecting to", url);
mongoose
  .connect(url || "")
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

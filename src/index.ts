import express from "express";

// connect to db
import "./db/mongoose";

const app = express();
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || "8080";

app.use(cors());

// app.use('/', rou)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

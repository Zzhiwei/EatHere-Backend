import express from "express";

import "dotenv/config";

// connect to db

const app = express();

import cors from "cors";
app.use(cors());
import "./db/mongoose";
const port = process.env.PORT || "8080";

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// app.use('/', rou)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

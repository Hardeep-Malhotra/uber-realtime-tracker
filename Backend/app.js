const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const connnectToDb = require("./db/db");
app.use(cors());

connnectToDb()
app.get("/", (req, res) => {
  res.send("Server is runingg");
});

module.exports = app;

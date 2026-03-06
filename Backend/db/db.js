const mongoose = require("mongoose");

function connectToDb() {
  const uri = process.env.DB_URI || process.env.DB_CONNECT; // support either name
  if (!uri) {
    console.error("Database connection string is not set (DB_URI or DB_CONNECT)");
    return;
  }

  mongoose
    .connect(uri)
    .then(() => {
      console.log("Connect to DB");
    })
    .catch((err) => {
      console.error("Database Connection error: ", err);
    });
}

module.exports = connectToDb;

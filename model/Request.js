const mongoose = require("mongoose");

const Request = mongoose.model("Request", {
  name: String,
  database: String,
  route: String,
  user: String,
});

module.exports = Request;

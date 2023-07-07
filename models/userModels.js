const mongoose = require("mongoose");
const users = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Enter your username"],
  },
  firstname: {
    type: String,
    required: [true, "Enter your firstname"],
  },
  lastname: {
    type: String,
    required: [true, "Enter your lastname"],
  },
  email: {
    type: String,
    required: [true, "Enter your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Enter your password"],
  },
});

module.exports = mongoose.model("users", users);

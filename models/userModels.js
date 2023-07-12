const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
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

users.plugin(uniqueValidator);

module.exports = mongoose.model("users", users);

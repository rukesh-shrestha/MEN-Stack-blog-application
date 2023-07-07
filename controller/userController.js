const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const users = require("../models/userModels");

const updateRegistration = asyncHandler(async (req, res) => {
  const { email, firstname, lastname, username, password } = req.body;
  // console.log(password);
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = await users.create({
    email: email,
    firstname: firstname,
    lastname: lastname,
    username: username,
    password: hashedPassword,
  });
  res.redirect("/");
});

const registration = (req, res) => {
  res.render("register");
};

const loginusers = (req, res) => {
  res.render("login");
};

const loginData = (req, res) => {
  res.redirect("/");
};
module.exports = { registration, updateRegistration, loginusers, loginData };

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const users = require("../models/userModels");
const { configDotenv } = require("dotenv");
const flash = require("connect-flash");
const updateRegistration = async (req, res) => {
  try {
    const { email, password, firstname, lastname, username } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    await users.create({
      email: email,
      firstname: firstname,
      lastname: lastname,
      username: username,
      password: hashedPassword,
    });

    res.redirect("/");
  } catch (error) {
    const errorsVal = "Email Already Used: " + error["_message"];

    req.flash("errors", errorsVal);

    // console.log(error, "errior");
    res.redirect("/registeruser");
  }
};

const registration = (req, res) => {
  const error = req.flash("errors")[0];

  res.render("register", {
    errors: error,
  });
};

const loginusers = (req, res) => {
  const error = req.flash("error");

  res.render("login", { error: error });
};

const loginData = (req, res) => {
  res.redirect("/");
};

const logoutController = (req, res) => {
  if (req.session) {
    if (req.session.userId) {
      req.session.destroy((err) => {
        loggedIn = null;
        if (err) {
          console.log(err);
        } else {
          return res.redirect("/");
        }
      });
    }
  }
};

module.exports = {
  registration,
  updateRegistration,
  loginusers,
  loginData,
  logoutController,
};

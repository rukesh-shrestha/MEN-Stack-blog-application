const users = require("../models/userModels");
const flash = require("connect-flash");
const userValidationMiddleware = async function (req, res, next) {
  try {
    const { email, password, confirmpassword } = req.body;
    const pattern = /^[a-zA-Z0-9\._\-]+@[a-z]+\.com$/;

    // Object.keys(err.erros);

    if (pattern.test(email)) {
      if (password === confirmpassword) {
        next();
      } else {
        throw new Error("Password do not match");
      }
    } else {
      throw new Error("Email did not meet the criteria");
    }
  } catch (error) {
    req.flash("errors", error.message);
    return res.redirect("/registeruser");
  }
};

module.exports = userValidationMiddleware;

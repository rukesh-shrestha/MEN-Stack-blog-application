const asyncHandler = require("express-async-handler");
const users = require("../models/userModels");
const userValidationMiddleware = asyncHandler(async function (req, res, next) {
  const { email, password, firstname, lastname, username, confirmpassword } =
    req.body;
  const pattern = /^[a-zA-Z0-9\._\-]+@[a-z]+\.com$/;

  if (
    !username ||
    !email ||
    !password ||
    !firstname ||
    !lastname ||
    !confirmpassword
  ) {
    // Object.keys(err.erros);
    return res.redirect("/registeruser");
  } else if (pattern.test(email)) {
    const userIn = await users.findOne({ email: email });
    if (userIn) {
      console.log("User Found");
      return res.redirect(`/register`);
    }
    if (password === confirmpassword) {
      next();
    } else {
      console.log("Password Do not Match");
      return res.redirect("/registeruser");
    }
  } else {
    return res.redirect("/registeruser");
  }
});

module.exports = userValidationMiddleware;

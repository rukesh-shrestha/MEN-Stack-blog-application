const bcrypt = require("bcrypt");
const users = require("../models/userModels");
const asyncHandler = require("express-async-handler");

const validateUser = asyncHandler(async function (req, res, next) {
  const { email, password } = req.body;
  console.log("validating");
  if (!email || !password) {
    return res.redirect("/login");
  }
  const userData = await users.findOne({ email: email });
  if (userData && (await bcrypt.compare(password, userData.password))) {
    next();
  } else {
    return res.redirect("/login");
  }
});
module.exports = validateUser;

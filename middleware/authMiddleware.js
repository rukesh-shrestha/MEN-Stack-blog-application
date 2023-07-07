const users = require("../models/userModels");
const asyncHandler = require("express-async-handler");
const authMiddleWare = asyncHandler(async function (req, res, next) {
  const userData = await users.findById(req.session.userId);
  if (!userData) {
    return res.redirect("/login");
  } else {
    next();
  }
});

module.exports = authMiddleWare;

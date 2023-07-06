const asyncHandler = require("express-async-handler");

const updateRegistration = asyncHandler(async (req, res) => {
  //   console.log(req.body);
  res.redirect("/registeruser");
});

const registration = (req, res) => {
  res.render("register");
};
module.exports = { registration, updateRegistration };

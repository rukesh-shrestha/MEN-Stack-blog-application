const bcrypt = require("bcrypt");
const users = require("../models/userModels");
const flash = require("connect-flash");

const validateUser = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    console.log("validating");

    const userData = await users.findOne({ email: email });
    if (userData && (await bcrypt.compare(password, userData.password))) {
      req.session.userId = userData.id;
      next();
    } else {
      throw new Error("User Not found");
    }
  } catch (error) {
    req.flash("error", error.message);
    return res.redirect("/login");
  }
};

module.exports = validateUser;

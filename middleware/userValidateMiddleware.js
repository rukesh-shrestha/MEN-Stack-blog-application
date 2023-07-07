const userValidationMiddleware = function (req, res, next) {
  const { username, email, password, firstname, lastname, confirmpassword } =
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
    return res.redirect("/registeruser");
  } else if (pattern.test(email)) {
    if (password === confirmpassword) {
      next();
    } else {
      return res.redirect("/registeruser");
    }
  }
};

module.exports = userValidationMiddleware;

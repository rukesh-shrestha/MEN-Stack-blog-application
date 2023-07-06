const userValidationMiddleware = function (req, res, next) {
  const { username, email, password, firstname, lastname } = req.body;
  if (!username || !email || !password || !firstname || !lastname) {
    return res.redirect("/registeruser");
  }

  return res.redirect("/");
  // if (!res.body) {
  //   return res.redirect("/registeruser");
  // }
  // const { username, email, firstname, lastname, password, confirmpassword } =
  //   req.body;

  // console.log(username);
  next();
};

module.exports = userValidationMiddleware;

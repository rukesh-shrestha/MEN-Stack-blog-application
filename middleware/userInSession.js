const includeSessionId = async function (req, res, next) {
  if (req.session.userId) {
    return res.redirect("/");
  } else {
    next();
  }
};

module.exports = includeSessionId;

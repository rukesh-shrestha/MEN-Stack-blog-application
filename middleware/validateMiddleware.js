const validateMiddleWare = function (req, res, next) {
  console.log(req.body, req.files);
  if (req.files == null || !req.body.title || !req.body.description) {
    return res.redirect("/createblog");
  }
  next();
};

module.exports = validateMiddleWare;

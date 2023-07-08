const bodyParser = require("body-parser");
const express = require("express");
const app = new express();
const fileUpload = require("express-fileupload");
const path = require("path");

app.use("/css", express.static(path.join(__dirname) + "/public"));

const connectDB = require("./config/dbConfiguration");
const validateMiddleWare = require("./middleware/validateMiddleware");

const blogRouter = require("./router/blogRouter");
const userRouter = require("./router/userRouter");
require("ejs");
require("dotenv").config();
const expressSession = require("express-session");

app.use(fileUpload());
const port = process.env.PORT;
connectDB();

global.loggedIn = null;

app.use(
  expressSession({
    secret: process.env.SECRETKEY_STRING,
    saveUninitialized: true,
    resave: false,
  })
);

app.use("*", function (req, res, next) {
  if (req.session) {
    if (req.session.userId) {
      loggedIn = req.session.userId;
    }
  }
  next();
});

app.use("/posts/store", validateMiddleWare);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("", userRouter);
app.use("", blogRouter);
app.all("*", (req, res) => {
  res.status(404).render("nofound");
});
app.listen(port, () => {
  console.log(`The server is running on ${port}`);
});

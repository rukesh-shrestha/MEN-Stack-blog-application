const express = require("express");
const userRouter = express.Router();
const {
  registration,
  updateRegistration,
  loginusers,
  loginData,
} = require("../controller/userController");
const userValidationMiddleware = require("../middleware/userValidateMiddleware");
const validateUser = require("../middleware/loginUserValidaeMiddleware");
userRouter.get("/registeruser", registration);
userRouter.post(
  "/users/register",
  userValidationMiddleware,
  updateRegistration
);

userRouter.get("/login", loginusers);

userRouter.post("/users/login", validateUser, loginData);
module.exports = userRouter;

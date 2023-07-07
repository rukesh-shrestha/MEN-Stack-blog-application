const express = require("express");
const userRouter = express.Router();
const {
  registration,
  updateRegistration,
  loginusers,
  loginData,
} = require("../controller/userController");
const userValidationMiddleware = require("../middleware/userValidateMiddleware");
const authMiddleWare = require("../middleware/authMiddleware");
const includeSessionId = require("../middleware/userInSession");
const validateUser = require("../middleware/loginUserValidaeMiddleware");
userRouter.get("/registeruser", includeSessionId, registration);
userRouter.post(
  "/users/register",
  userValidationMiddleware,
  updateRegistration
);

userRouter.get("/login", includeSessionId, loginusers);

userRouter.post("/users/login", validateUser, loginData);
module.exports = userRouter;

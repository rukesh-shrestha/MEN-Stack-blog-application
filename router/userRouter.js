const express = require("express");
const userRouter = express.Router();
const {
  registration,
  updateRegistration,
} = require("../controller/userController");
const userValidationMiddleware = require("../middleware/userValidateMiddleware");
userRouter.get("/registeruser", registration);
userRouter.post(
  "/users/register",
  userValidationMiddleware,
  updateRegistration
);

module.exports = userRouter;

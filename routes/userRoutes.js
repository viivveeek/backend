const express = require("express");
const {
  signin,
  signup,
  reportBugs,
  resetPassword,
  createFeedback,
} = require("../controllers/userController");

const userRouter = express.Router();
const {
  auth,
  loginRateLimiter,
  feedbackRequestsLimiter,
} = require("../middlewares");

userRouter.post("/signin", loginRateLimiter, signin);
userRouter.post("/signup", signup);
userRouter.post("/report-bugs", auth, reportBugs);
userRouter.patch("/reset-password", auth, resetPassword);
userRouter.post("/create-feedback", feedbackRequestsLimiter, createFeedback);

module.exports = userRouter;

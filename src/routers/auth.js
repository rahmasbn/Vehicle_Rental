const express = require("express");

const authController = require("../controllers/auth");
const authRouter = express.Router();
const validate = require("../middlewares/validate");
const authorize = require("../middlewares/authorize");

// /auth
authRouter.post("/login", validate.login, authController.login);
authRouter.post("/register", validate.register, authController.register);
authRouter.delete("/logout", authorize.checkToken, authController.logout);
authRouter.post("/forgot-password", authController.forgotPassword);
authRouter.post("/check-otp", authController.checkOTP);
authRouter.post("/reset-password", authController.resetPassword);

module.exports = authRouter;

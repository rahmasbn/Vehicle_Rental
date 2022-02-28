const express = require("express");

const authController = require("../controllers/auth");
const authRouter = express.Router();
const validate = require("../middlewares/validate");
const authorize = require("../middlewares/authorize");

// /auth
// login
authRouter.post("/login", validate.login, authController.login);

// register
authRouter.post("/register", validate.register, authController.register);

// logout
authRouter.delete("/logout", authorize.checkToken, authController.logout);

module.exports = authRouter;

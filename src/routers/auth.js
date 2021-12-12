const express = require("express");

const authController = require("../controllers/auth");
const authRouter = express.Router();
const validate = require("../middlewares/validate");

// /auth
// login
authRouter.post("/login", validate.login, authController.login);

// register
authRouter.post("/register", validate.register, authController.register);

// logout
// authRouter.delete("/logout");

module.exports = authRouter;

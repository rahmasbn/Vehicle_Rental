const express = require("express");
const mainRouter = express.Router();

const userRouter = require("./users");
const vehicleRouter = require("./vehicles");
const transactionRouter = require("./transaction");
const cityRouter = require("./cities");
const authRouter = require("./auth");

mainRouter.use("/users", userRouter)                // /users
mainRouter.use("/vehicles", vehicleRouter)          // /vehicles
mainRouter.use("/transaction", transactionRouter)   // /transaction
mainRouter.use("/cities", cityRouter)               // /cities
mainRouter.use("/auth", authRouter)                 // /auth


module.exports = mainRouter;









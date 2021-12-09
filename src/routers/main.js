const express = require("express");
const mainRouter = express.Router();

const userRouter = require("./users");
const vehicleRouter = require("./vehicles");
const transactionRouter = require("./transaction");
const cityRouter = require("./cities");

mainRouter.use("/users", userRouter)                // /users
mainRouter.use("/vehicles", vehicleRouter)          // /vehicles
mainRouter.use("/transaction", transactionRouter)   // /transaction
mainRouter.use("/cities", cityRouter)               // /cities

module.exports = mainRouter;









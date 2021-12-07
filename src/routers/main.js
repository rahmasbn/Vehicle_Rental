const express = require("express");
const mainRouter = express.Router();

const userRouter = require("./users");
const vehicleRouter = require("./vehicles");
const transactionRouter = require("./transaction");
const locationRouter = require("./location");

mainRouter.use("/users", userRouter)                // /users
mainRouter.use("/vehicles", vehicleRouter)          // /vehicles
mainRouter.use("/transaction", transactionRouter)   // /transaction
mainRouter.use("/location", locationRouter)         // /location

module.exports = mainRouter;









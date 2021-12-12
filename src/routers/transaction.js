const express = require("express");

const transactionController = require("../controllers/transaction");
const transactionRouter = express.Router();
const authorize = require("../middlewares/authorize");

// /transaction
// new transaction
transactionRouter.post("/", authorize.checkToken, transactionController.postNewTransaction);

// update data
transactionRouter.put("/:id", transactionController.updateTransactionById);

// Transaction by vehicle type
transactionRouter.get("/vehicleType", transactionController.getTransactionByVehicleType);

// All transaction
transactionRouter.get("/", transactionController.getAllTransaction);

// Detail transaction
transactionRouter.get("/:id", transactionController.getDetailTransactionById);

// delete transaction
transactionRouter.delete("/:id", transactionController.deleteTransactionById);

module.exports = transactionRouter;

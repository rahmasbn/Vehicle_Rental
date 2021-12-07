const express = require("express");

const transactionController = require("../controllers/transaction");

const transactionRouter = express.Router();

// /transaction
// new transaction
transactionRouter.post("/", transactionController.postNewTransaction);

// update data
transactionRouter.put("/", transactionController.updateTransactionById);

// Transaction by vehicle type
transactionRouter.get("/vehicleType", transactionController.getTransactionByVehicleType);

// All transaction
transactionRouter.get("/", transactionController.getAllTransaction);

// Detail transaction
transactionRouter.get("/:id", transactionController.getDetailTransactionById);

// delete transaction
transactionRouter.delete("/", transactionController.deleteTransactionById);

module.exports = transactionRouter;

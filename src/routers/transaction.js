const express = require("express");

const transactionController = require("../controllers/transaction");
const transactionRouter = express.Router();
const authorize = require("../middlewares/authorize");

// /transaction
// new transaction
transactionRouter.post("/", authorize.checkToken, transactionController.postNewTransaction);

// update data
transactionRouter.patch("/:id", authorize.checkToken, transactionController.updateTransactionById);

// Transaction by vehicle type
transactionRouter.get("/vehicleType", authorize.checkToken, transactionController.getTransactionByVehicleType);

// All transaction
// transactionRouter.get("/", authorize.checkToken, transactionController.getAllTransaction);
transactionRouter.get("/", authorize.checkToken, transactionController.getTransaction);


// Detail transaction
transactionRouter.get("/:id", authorize.checkToken, transactionController.getDetailTransactionById);

// delete transaction
transactionRouter.delete("/:id", authorize.checkToken, transactionController.deleteTransactionById);

module.exports = transactionRouter;

const express = require("express");

const vehicleController = require("../controllers/vehicles");
const vehicleRouter = express.Router();
const upload = require("../middlewares/upload");
const authorize = require("../middlewares/authorize")

// /vehicles
// Post new vehicle
vehicleRouter.post("/", upload, vehicleController.postNewVehicle);

// Update vehicle data by id
vehicleRouter.put("/:id", authorize.authorizeAdminAndOwner, vehicleController.updateVehicleById);

vehicleRouter.get("/popular", vehicleController.getVehicleByRating);

// All vehicles
vehicleRouter.get("/", vehicleController.getAllVehiclesWithOrder);

// Detail Vehicles
vehicleRouter.get("/:id", vehicleController.getDetailVehicleById);

// Delete vehicle by id
vehicleRouter.delete("/:id", authorize.authorizeAdminAndOwner, vehicleController.deleteVehicleById);


module.exports = vehicleRouter;

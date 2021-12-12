const express = require("express");

const vehicleController = require("../controllers/vehicles");

const vehicleRouter = express.Router();

// /vehicles
// Post new vehicle
vehicleRouter.post("/", vehicleController.postNewVehicle);

// Update vehicle data by id
vehicleRouter.put("/:id", vehicleController.updateVehicleById);

// get vehicle by name
vehicleRouter.get("/search", vehicleController.getVehicleByName);

// get Vehicle by type
vehicleRouter.get("/type", vehicleController.getVehicleByType);

vehicleRouter.get("/popular", vehicleController.getVehicleByRating);

// All vehicles
vehicleRouter.get("/", vehicleController.getAllVehicles);

// Detail Vehicles
vehicleRouter.get("/:id", vehicleController.getDetailVehicleById);

// Delete vehicle by id
vehicleRouter.delete("/:id", vehicleController.deleteVehicleById);


module.exports = vehicleRouter;

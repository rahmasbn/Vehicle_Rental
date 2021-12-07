const express = require("express");

const vehicleController = require("../controllers/vehicles");

const vehicleRouter = express.Router();

// /vehicles
// Post new vehicle
vehicleRouter.post("/", vehicleController.postNewVehicle);

// Update vehicle data by id
vehicleRouter.put("/updateVehicle", vehicleController.updateVehicleById);

// get vehicle by name
vehicleRouter.get("/search", vehicleController.getVehicleByName);

// get Vehicle by type
vehicleRouter.get("/type", vehicleController.getVehicleByType);

vehicleRouter.get("/rating", vehicleController.getVehicleByRating);

// All vehicles
vehicleRouter.get("/", vehicleController.getAllVehicles);

// Detail Vehicles
vehicleRouter.get("/:id", vehicleController.getDetailVehicleById);

// Delete vehicle by id
vehicleRouter.delete("/", vehicleController.deleteVehicleById);

// get vehicle by city
// vehicleRouter.get("/vehicles-city", (req, res) => {
//   const { query } = req;

//   const sqlQuery = `SELECT * FROM vehicles WHERE city_id = ${query.city_id}`;
//   // console.log(query);
//   db.query(sqlQuery, (err, result) => {
//     if (err) return res.status(500).json({ msg: "Terjadi Error", err });
//     console.log(result);
//     return res.status(200).json({ result });
//   });
// });

module.exports = vehicleRouter;

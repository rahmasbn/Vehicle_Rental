const express = require("express");

const locationController = require("../controllers/location");

const locationRouter = express.Router();

// Location
locationRouter.post("/", locationController.postNewLocation);

locationRouter.get("/", locationController.getAllLocation);

module.exports = locationRouter;

const express = require("express");

const cityController = require("../controllers/cities");

const cityRouter = express.Router();

// cities
cityRouter.post("/", cityController.postNewCity);

cityRouter.get("/", cityController.getAllCities);

module.exports = cityRouter;

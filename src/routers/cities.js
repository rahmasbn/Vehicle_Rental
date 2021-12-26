const express = require("express");

const cityController = require("../controllers/cities");
const cityRouter = express.Router();
const authorize = require("../middlewares/authorize");

// cities
cityRouter.post("/", authorize.authorizeOwner, cityController.postNewCity);

cityRouter.get("/", cityController.getAllCities);

module.exports = cityRouter;

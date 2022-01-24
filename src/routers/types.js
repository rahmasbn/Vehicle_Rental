const express = require("express");

const typeController = require("../controllers/types");
const typeRouter = express.Router();


// types
typeRouter.get("/", typeController.getAllTypes);

module.exports = typeRouter;

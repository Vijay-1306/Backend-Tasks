const express = require("express");

const reOrderRouters = express.Router();

const controllers = require("../../controllers/index").reorderController;

//Create order

reOrderRouters.post("/reOrder", controllers.reOrder);

module.exports = reOrderRouters;

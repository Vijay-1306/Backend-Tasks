const express = require("express");

const orderRouters = express.Router();

const controllers = require("../../controllers/index").ordersController;

//Create order

orderRouters.post("/createOrder", controllers.createOrder);

module.exports = orderRouters;

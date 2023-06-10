const express = require("express");
const addressRoutes = express.Router();

const controllers = require("../../controllers/addressController");

addressRoutes.post("/createAddress", controllers.createAddress);
addressRoutes.get("/getAllUsersAddress", controllers.getAllUserAddress);
addressRoutes.get("/getAddressById", controllers.getUserAddressById);
addressRoutes.delete("/deleteAddress", controllers.deleteAddressByUserId);
addressRoutes.put("/updateAddress", controllers.updateAddress);

module.exports = addressRoutes;

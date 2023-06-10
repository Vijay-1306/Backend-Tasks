//Importing Express Package
const express = require("express");
const userRouters = express.Router();
const controllers = require("../../controllers/index").userController;

//User routes
//POST API
userRouters.post("/createUser", controllers.createUser);
//GET API
userRouters.get("/getAllUsers", controllers.getAllUser);
//GET API BY ID
userRouters.get("/getUserById", controllers.getUserListById);
//UPDATE API BY ID
userRouters.put("/updateUser", controllers.updateUser);

//DELETE API BY ID
userRouters.delete("/deleteUser", controllers.deleteUser);

module.exports = userRouters;

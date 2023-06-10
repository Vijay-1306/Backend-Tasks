require("dotenv").config();
let CONFIG = require("./config")("LOCAL");
const mongoose = require("mongoose");
console.log(CONFIG.MONGO_URL, "CONFIG.MONGO_URL");
module.exports = async () => {
  mongoose.connect(CONFIG.MONGO_URL, {
    useNewUrlParser: true,
  });
  let dataBase = mongoose.connection;
  dataBase.on("error", (err) => {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running"
    );
    process.exit();
  });
  console.log("Database connection established.");
};

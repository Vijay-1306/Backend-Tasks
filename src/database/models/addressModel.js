const mongoose = require("mongoose");

const Schema = require("../schemas/index").addressSchema;

module.exports = mongoose.model("Address", Schema);

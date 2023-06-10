const mongoose = require("mongoose");

const Schema = require("../schemas/index").userSchema;

module.exports = mongoose.model("User", Schema);

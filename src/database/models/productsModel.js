const mongoose = require("mongoose");
const productsSchema = require("../schemas").productsSchema;

module.exports = mongoose.model("products", productsSchema);

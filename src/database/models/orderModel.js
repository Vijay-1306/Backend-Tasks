const mongoose = require("mongoose");
const orderSchema = require("../schemas/index").ordersSchema;
module.exports = mongoose.model("orders", orderSchema);

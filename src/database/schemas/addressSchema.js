const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      reuired: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      reuired: true,
    },
    city: {
      type: String,
      reuired: true,
    },
    pinCode: {
      type: Number,
      reuired: true,
    },
  },
  {
    timestamps: true,
  }
);

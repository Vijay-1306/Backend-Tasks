const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    emailId: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      reuired: true,
    },
  },
  {
    timestamps: true,
  }
);

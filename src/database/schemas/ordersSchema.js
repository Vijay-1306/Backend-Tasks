const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = new Schema(
  {
    productIds: {
      type: [Schema.Types.ObjectId],
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },

    // //address for the order
    addressDetails: {
      address1: {
        type: String,
        required: true,
        minlength: 3,
      },
      address2: {
        type: String,
        required: true,
        minlength: 3,
      },
      state: {
        type: String,
        reuired: true,
      },
      city: {
        type: String,
        required: true,
      },
      pinCode: {
        type: String,
        required: true,
        minlength: 6,
      },
    },

    //order datas
    orderDetails: {
      orderTotal: {
        type: String,
        required: true,
      },
      productPrice: {
        type: String,
        required: true,
      },
      discountPrice: {
        type: String,
        required: true,
      },
      customerPrice: {
        type: String,
        required: true,
      },
      deliveryCharge: {
        type: String,
      },
      couponDiscount: {
        type: String,
      },
      internalCashDiscount: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

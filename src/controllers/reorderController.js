const Models = require("../database/models/index");

let ordersSchema = Models.orders;
const productSchema = Models.products;
const userSchema = Models.user;
const addressSchema = Models.address;

class reorderController {
  static reOrder = async (request, response) => {
    try {
      const reOrderDetails = await ordersSchema.findById(request.body.orderId);

      //Checking the products list received from the user additionaly added or not
      const list = [
        ...reOrderDetails.productIds.map((item) => String(item)),
        ...(request.body.additionalProducts
          ? request.body.additionalProducts
          : []),
      ];
      console.log(list, "LIST");

      //Duplicate IDS removing
      const productArray = [...new Set(list)];
      console.log(productArray);

      //Calculation for existing and additional product order prices.

      const orderDetails = {
        orderTotal: 0,
        productPrice: 0,
        discountPrice: 0,
        customerPrice: 0,
      };
      for (let index = 0; index < productArray.length; index++) {
        const element = productArray[index];
        const productDetails = await productSchema.findById(element);
        console.log(element, productDetails, "element");
        //stating the value to the orderDetails
        orderDetails.customerPrice += productDetails.MRMEDPrice;
        orderDetails.productPrice += productDetails.mrp;
        orderDetails.orderTotal += productDetails.MRMEDPrice;
        orderDetails.discountPrice +=
          productDetails.mrp - productDetails.MRMEDPrice;
      }

      //Calculations for Coupon and COD
      if (
        Boolean(request.body.couponCode) ||
        Boolean(request.body.internalCash)
      ) {
        switch (true) {
          //Calculations for coupon
          case Boolean(request.body.couponCode):
            orderDetails.couponDiscount = Number(request.body.couponCode);
            orderDetails.orderTotal -= Number(request.body.couponCode);
            // console.log(orderDetails, "orderDetailssssssssss");
            break;

          //Calculations for Cash
          case Boolean(request.body.internalCash):
            orderDetails.internalCashDiscount = Number(
              request.body.internalCash
            );
            orderDetails.orderTotal -= Number(request.body.internalCash);
            break;
          default:
            break;
        }
      }

      const finalOrders = {
        userId: reOrderDetails.userId,
        productIds: productArray,
        addressDetails: reOrderDetails.addressDetails,
        orderDetails: orderDetails,
      };
      console.log(finalOrders, "finalOrders");

      const customerOrder = await ordersSchema.create(finalOrders);
      console.log(customerOrder);

      const user = await userSchema.findById(reOrderDetails.userId);
      console.log(user, "user");
      return response.status(200).send({
        status: 200,
        message: `Hi ${user.name}, your order has been created succesfully.`,
        data: customerOrder,
      });
    } catch (error) {
      console.log(error, "error");
      return response.status(400).send({
        status: 400,
        message: error,
      });
    }
  };
}

module.exports = reorderController;

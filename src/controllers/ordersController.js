const { ORDER_STATUS } = require("../constants");
const Models = require("../database/models/index");
const { sendMail } = require("../nodeMailerService");

let ordersSchema = Models.orders;
const productSchema = Models.products;
const userSchema = Models.user;
const addressSchema = Models.address;

class ordersController {
  //Create Order
  static createOrder = async (request, response) => {
    try {
      // console.log(request.body.addressId);
      //Getting Address details from the user
      const address = await addressSchema.find({
        userId: request.body.userId,
        _id: request.body.addressId,
      });
      // console.log(address, "address");
      //Products
      const productArray = request.body.productIds;
      // console.log(productArray);
      //Getting All informations about the product and its calculations.
      const orderDetails = {
        orderTotal: 0,
        productPrice: 0,
        discountPrice: 0,
        customerPrice: 0,
      };
      // console.log(orderDetails, "orderDetails");
      for (let i = 0; i < productArray.length; i++) {
        const item = productArray[i];
        // console.log(item, "item");
        //Getting product information using product ids from product schemas
        const productDetails = await productSchema.findById(item);
        // console.log(productDetails);
        //stating the value to the orderDetails
        orderDetails.customerPrice += productDetails.MRMEDPrice;
        orderDetails.productPrice += productDetails.mrp;
        orderDetails.orderTotal += productDetails.MRMEDPrice;
        orderDetails.discountPrice +=
          productDetails.mrp - productDetails.MRMEDPrice;
      }
      // console.log(orderDetails, "orderDetails");
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
      //Creating API for new order
      const finalOrders = {
        userId: request.body.userId,
        productIds: productArray,
        addressDetails: {
          address1: address[0].address1,
          address2: address[0].address2,
          city: address[0].city,
          state: address[0].state,
          pinCode: address[0].pinCode,
        },
        orderDetails: { ...orderDetails },
        orderStatus: ORDER_STATUS[0],
      };
      console.log(finalOrders);
      const customerOrder = await ordersSchema.create(finalOrders);
      // console.log(customerOrder);
      const user = await userSchema.findById(request.body.userId);
      const mailToBeSent = () => {
        let orderDetails = customerOrder.orderDetails;
        return {
          subject: "Order placed succesfully",
          to: user.emailId,
          text: `Hi ${user.name},
           Your order has been placed succesfully in our website.Thanks for placing your first order!
           Here is your order details:-
           Order Id : ${customerOrder._id}
           Order Total: ₹${orderDetails?.orderTotal || ""}
           Products Price: ₹${orderDetails?.productPrice || ""}
           Discount Price: ₹${orderDetails?.discountPrice || ""}
           Price To Customer: ₹${orderDetails?.customerPrice || ""}
           ${
             Boolean(orderDetails?.couponDiscount)
               ? "Coupon Discount : ₹" + orderDetails?.couponDiscount
               : Boolean(orderDetails?.internalCashDiscount)
               ? "Internal Cash Applied : ₹" +
                 orderDetails?.internalCashDiscount
               : ""
           }
           We are happy to have you as our valuable customer. Thanks for shopping with us.
           For futher more details please visit our website.
           Thank you !
           Happy Shopping !`,
        };
      };
      await sendMail(mailToBeSent());
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

module.exports = ordersController;

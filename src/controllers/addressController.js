const Models = require("../database/models");
const { sendMail } = require("../nodeMailerService");
const addressSchema = Models.address;
const userSchema = Models.user;

class addresController {
  static createAddress = async (request, response) => {
    try {
      const userDetails = await userSchema.findById(request.body.userId);
      if (!userDetails)
        return response.status(404).send({
          status: 404,
          message: "user does not exist!",
        });
      const newAddress = {
        ...request.body,
      };

      const addressCreated = await addressSchema.create(newAddress);

      const mailToBeSent = () => {
        return {
          subject: "Address have been updated succesfully",
          to: userDetails.emailId,
          text: `Hi ${addressCreated.name}, Your address has been updated successfully.
           We are happy to have you as our valuable customer. Thanks for shopping with us.
           For futher more details please visit our website.
           Thank you !
           Happy Shopping !`,
        };
      };
      await sendMail(mailToBeSent());
      return response.status(200).send({
        status: 200,
        message: `Successfully address added for ${addressCreated.name}`,
        data: addressCreated,
      });
    } catch (error) {
      response.status(400).send({
        status: 400,
        message: "Bad Request",
        data: error.message,
      });
    }
  };
  static getAllUserAddress = async (request, response) => {
    try {
      const getAllUserAddress = await addressSchema.find({});
      return response.status(200).send({
        status: 200,
        message: `Address list fetched successfully`,
        data: getAllUserAddress,
      });
    } catch (error) {
      response.status(400).send({
        status: 400,
        message: "Bad Request",
        data: error.message,
      });
    }
  };
  static getUserAddressById = async (request, response) => {
    try {
      const getAddressById = await addressSchema.find({
        userId: request.query.id,
      });

      if (!Boolean(getAddressById) || getAddressById.length == 0)
        return response.status(404).send({
          status: 404,
          message: "Address List for given User ID is not found!",
        });
      return response.status(200).send({
        status: 200,
        message: `User address fetched successfully`,
        data: getAddressById,
      });
    } catch (error) {
      response.status(400).send({
        status: 400,
        message: "Bad Request",
        data: error.message,
      });
    }
  };
  static deleteAddressByUserId = async (request, response) => {
    try {
      const getAddressById = await addressSchema.find({
        userId: request.query.id,
      });

      if (!Boolean(getAddressById) || getAddressById.length == 0)
        return response.status(404).send({
          status: 404,
          message: "Address List for given User ID is not found!",
        });
      console.log(getAddressById[0]._id, "ID");
      await addressSchema.findByIdAndDelete(getAddressById[0]._id).then(() => {
        response.status(200).send({
          status: 200,
          message: `Address deleted successfully`,
        });
      });
    } catch (error) {
      response.status(400).send({
        status: 400,
        message: "Bad Request",
        data: error.message,
      });
    }
  };

  static updateAddress = async (request, response) => {
    try {
      const getAddressById = await addressSchema.find({
        userId: request.query.id,
      });

      if (!Boolean(getAddressById) || getAddressById.length == 0)
        return response.status(404).send({
          status: 404,
          message: "Address List for given User ID is not found!",
        });
      console.log(getAddressById[0]._id, "ID");
      await addressSchema
        .findByIdAndUpdate(getAddressById[0]._id, request.body)
        .then(() => {
          response.status(200).send({
            status: 200,
            message: `Address Updated successfully`,
          });
        });
    } catch (error) {
      response.status(400).send({
        status: 400,
        message: "Bad Request",
        data: error.message,
      });
    }
  };
}

module.exports = addresController;

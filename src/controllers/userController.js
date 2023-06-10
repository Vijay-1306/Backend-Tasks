const { USER_STATUS } = require("../constants");
const Models = require("../database/models/index");
const { sendMail } = require("../nodeMailerService");
const userModel = Models.user;

class userController {
  //Post API Create User
  static createUser = async (request, response) => {
    const newUserDetails = new userModel({
      name: request.body.name,
      emailId: request.body.emailId,
      number: request.body.number,
      password: request.body.password,
      userStatus: USER_STATUS[0],
    });
    try {
      const databaseUser = await userModel.find();
      let validateUser = databaseUser.find((item) => {
        if (
          Number(newUserDetails.number) === Number(item.number) ||
          newUserDetails.emailId === item.emailId
        ) {
          return item;
        }
      });

      if (validateUser) {
        return response.status(201).send({
          status: 201,
          message: "User already exist!",
        });
      } else {
        const addedUser = await newUserDetails.save();
        const mailToBeSent = () => {
          return {
            subject: "User Created Successfully",
            to: addedUser.emailId,
            text: `Hi ${addedUser.name}, 
            It is our pleasure to have you as our valueable customer.
            Your email Id has been registered successfully with us. We have more offers and discounts on our website.
            Please free to have a look on our website.We are happy to have you as our valuable customer.
            Thanks for shopping with us.
            For futher more details please visit our website.
            Thank you!
            Happy Shopping`,
          };
        };

        console.log(mailToBeSent(), "mailDetails---->");
        await sendMail(mailToBeSent());
        response.status(200).send({
          status: 200,
          message: "User added succesfully",
          data: addedUser,
        });
      }
    } catch (error) {
      response.json({
        status: 400,
        message: `${error} has been occurred`,
      });
    }
  };

  //Get API Users list
  static getAllUser = async (request, response) => {
    try {
      let usersList = await userModel.find({});
      return response.json({
        status: 200,
        message: "All users list",
        data: usersList,
      });
    } catch (error) {
      return response.json({
        status: 400,
        message: `${error} has been occurred`,
      });
    }
  };

  //Get by Id User API
  static getUserListById = async (request, response) => {
    try {
      let userById = await userModel.findById({ _id: request.query.id });
      return response.json({
        status: 200,
        message: "User detail received",
        data: userById,
      });
    } catch (error) {
      response.json({
        status: 400,
        message: `${error} has been occurred`,
      });
    }
  };

  //Update API by User Id

  static updateUser = async (request, response) => {
    try {
      const userFindById = userModel.findById({ _id: request.query.id });
      if (!userFindById) {
        return response.status(404).send({
          status: 404,
          message: "User is not found for the given ID",
        });
      }
      await userModel
        .findByIdAndUpdate(request.query.id, request.body)
        .then(async () => {
          const mailToBeSent = async () => {
            return {
              subject: "User Details updated succesfully",
              to: addedUser.emailId,
              text: `Hi ${addedUser.name}, your personal informations have been updated successfully.
                     
                    We are happy to have you as our valuable customer. 
                    
                    Thanks for shopping with us.
          
                    For futher more details please visit our website.
          
                    Thank you!
          
                    Happy Shopping`,
            };
          };

          await sendMail(mailToBeSent());
          response.status(200).send({
            status: 200,
            message: "User updated succesfully",
          });
        });
    } catch (error) {
      console.log(error);
      response.status(400).send({
        message: "error",
        data: error,
      });
    }
  };

  //Delete API by User Id

  static deleteUser = async (request, response) => {
    try {
      const userFindById = userModel.findById({ _id: request.query.id });
      if (!userFindById) {
        return response.status(404).send({
          status: 404,
          message: "User is not found for the given ID",
        });
      }
      await userModel.findByIdAndDelete(request.query.id).then(() => {
        response.status(200).send({
          status: 200,
          message: "User Deleted succesfully",
        });
      });
    } catch (error) {
      console.log(error);
      response.status(400).send({
        message: "error",
        data: error,
      });
    }
  };
}
module.exports = userController;

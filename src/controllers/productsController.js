const Models = require("../database/models");

const productModel = Models.products;

const xlsx = require("xlsx");

class productsExcelUpload {
  static productsBulkUpload = async (request, responses) => {
    try {
      //Getting the file from the client
      const file = xlsx.readFile(request.file.path);
      console.log(file, "request.file");

      //Getting headers in the excelt file
      const sheet = file.Sheets[file.SheetNames[0]];

      //convert sheet to json
      const fileJSON = xlsx.utils.sheet_to_json(sheet);

      // check file is exist and also not empty
      if (!Boolean(fileJSON) || fileJSON.length == 0) {
        return res.status(201).send({
          status: 201,
          data: "No data found in the file!",
        });
      }

      let schemaDataKeys = [];
      const dbData = await productModel.find();
      fileJSON.map((item) => {
        let object = new Object();
        object.no = item["S.No"];
        object.productName = item["Product Name"];
        object.productCode = item["Product Code"];
        object.strength = item["Strength"];
        object.dosageForm = item["Dosage Form"];
        object.packingForm = item["Packing Form"];
        object.packingDetails = item["Packing Details"];
        object.packingSize = item["Packing Size"];
        object.weight = item["Weight"];
        object.care_Yes_No = item["Care (Yes/No)"];
        object.salt = item["Salt"];
        object.saltGroup = item["Salt Group"];
        object.speciality = item["Speciality"];
        object.condition = item["Condition"];
        object.manufacturer = item["Manufacturer"];
        object.mrp = item["MRP"];
        object.MRMEDPrice = item["MRMED Price"];
        object.tax_percent = item["Tax %"];
        object.prescription_Yes_No = item["Prescription (Yes/No)"];
        object.PAP_Yes_No = item["PAP (Yes/No)"];
        object.PAPOffer = item["PAP Offer"];
        object.countryOrigin = item["Country Origin"];
        object.imageURL = item["Image URL"];
        object.ABCD = item["ABCD"];
        object.HSN = item["HSN"];
        object.stock = item["Stock"];
        object.coupon_Yes_No = item["Coupon (Yes/No)"];
        object.cash_Yes_No = item["Cash (Yes/No)"];
        object.hidden_Yes_No = item["Hidden (Yes/No)"];

        const isPresent =
          dbData.filter((dbItem) => dbItem.productCode !== object.productCode)
            .length > 0;
        !isPresent && schemaDataKeys.push(object);
      });
      //check for duplicate data
      if (schemaDataKeys.length == 0) {
        return responses.status(201).send({
          status: 201,
          data: "Datas in this file is already added !",
        });
      }

      await productModel.insertMany(schemaDataKeys).then((response) => {
        if (response.length > 0) {
          return responses.status(200).send({
            status: 200,
            message: `${response.length} items added successfully!`,
          });
        }
      });
    } catch (error) {
      responses.status(400).send({
        status: 400,
        data: error.message,
      });
    }
  };
}
module.exports = productsExcelUpload;

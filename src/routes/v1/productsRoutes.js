const express = require("express");

const multer = require("multer");

const productRouter = express.Router();

const controllers = require("../../controllers/index").productsController;
const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    console.log(request, "request");

    cb(null, "src/fileUpload");
  },
  filename: (request, file, cb) => {
    console.log(request, "request");
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

productRouter.post(
  "/bulkUpload",
  upload.single("file"),
  controllers.productsBulkUpload
);

module.exports = productRouter;

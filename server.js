//Importing Express
const express = require("express");

//Importing body-parser package
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Importing dotenv
require("dotenv").config();
const db = require("./src/configs/index").dbConfigs();
//Importing Routes file
const Routers = require("./src/routes");
Routers(app);
let CONFIG = require("./src/configs/index").CONFIG("LOCAL");
//Getting Port number from dbConfig JS file
let port = CONFIG.PORT;
app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);

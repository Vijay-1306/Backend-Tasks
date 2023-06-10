const { dbConfigs } = require("../../configs");
dbConfigs();

module.exports = {
  user: require("./userModel"),
  address: require("./addressModel"),
  products: require("./productsModel"),
  orders: require("./orderModel"),
};

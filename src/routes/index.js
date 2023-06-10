const intializeRouters = (app) => {
  app.use("/api/v1/user", require("./v1/userRoutes"));
  app.use("/api/v1/user/address", require("./v1/addressRoutes"));
  app.use("/api/v1/products", require("./v1/productsRoutes"));
  app.use("/api/v1/orders", require("./v1/ordersRoutes"));
  app.use("/api/v1/orders", require("./v1/reOrderRoutes"));
};
module.exports = intializeRouters;

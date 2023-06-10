module.exports = function (env) {
  const LOCAL_CONSTANTS = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGODB_URL,
  };
  let envType;
  if (env === "LOCAL") {
    envType = LOCAL_CONSTANTS;
  }
  return envType;
};

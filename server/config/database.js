const mongoose = require("mongoose");
require("dotenv").config();
exports.connect = () => {
  mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("DB Connected Successfully"))
    .catch((error) => {
      console.error("DB Connection Failed:", error.message);
      process.exit(1);
    });
};
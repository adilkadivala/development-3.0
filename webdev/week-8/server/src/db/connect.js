const mongoose = require("mongoose");

const connectionLink = process.env.DATA_BASE_URL;

const connect = async () => {
  try {
    await mongoose.connect(connectionLink);
    console.log("database connected");
  } catch (error) {
    console.log("database not connected");
  }
};

module.exports = connect;

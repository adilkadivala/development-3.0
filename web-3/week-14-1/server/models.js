const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/web3-week14-1", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({    
    username: String,
    password: String,
    privateKey: String,
    publicKey: String,
});

const userModel = mongoose.model("User", userSchema);

module.exports = {
    userModel,
};
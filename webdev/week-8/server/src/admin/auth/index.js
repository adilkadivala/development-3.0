const jwt = require("jsonwebtoken");

const JWT_sercer = process.env.JWT_SECRET || "thisisjustsecret";

// sign-in
const signIn = async (req, res) => {
  try {
    res.send({ message: "this is sign-in route of an admin" });
  } catch (error) {
    console.log(error);
  }
};

//sign-up
const signUp = async (req, res) => {
  try {
    res.send({ message: "this is sign-up route of an admin" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signIn,
  signUp,
};

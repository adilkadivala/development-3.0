const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const adminSchema = Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  lastName: String,
});

const courseSchema = Schema({
  title: String,
  description: String,
  price: Number,
  imgUrl: String,
  creater: ObjectId,
});

const purchaseSchema = Schema({
  userId: ObjectId,
  courseId: ObjectId,
});

const userModel = mongoose.Model("users", userSchema);
const adminModel = mongoose.Model("admin", adminSchema);
const coursesModel = mongoose.Model("courses", courseSchema);
const purchasesModel = mongoose.Model("purchases", purchaseSchema);

module.exports = {
  userModel,
  adminModel,
  purchasesModel,
  coursesModel,
};

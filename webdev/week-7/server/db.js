const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
  name: String,
  email: String,
  password: String,
});

const Todo = new Schema({
  title: String,
  done: Boolean,
  userId: ObjectId,
});

const UserModal = mongoose.model("users", User);
const TodoModal = mongoose.model("todos", Todo);

module.exports = { UserModal, TodoModal };

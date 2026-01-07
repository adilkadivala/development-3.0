import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: { type: String, required: true, minLength: 6 },
  firstName: { type: String, required: true, trim: true, maxLength: 50 },
  lastName: { type: String, required: true, trim: true, maxLength: 50 },
});

export const Users = mongoose.model("users", userSchema);



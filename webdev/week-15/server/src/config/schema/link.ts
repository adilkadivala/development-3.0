import mongoose, { model, Schema } from "mongoose";

const LinkSchema = new Schema({
  hash: String,
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
    unique: true,
  },
});

export const LinkModal = model("links", LinkSchema);

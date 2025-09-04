import mongoose, { model, Schema } from "mongoose";

const ContentSchema = new Schema({
  title: String,
  link: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "tags" }],
  userId: { type: mongoose.Types.ObjectId, ref: "users" },
});

export const ContentModal = model("Content", ContentSchema);

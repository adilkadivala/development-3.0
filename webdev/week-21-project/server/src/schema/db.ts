import mongoose from "mongoose";

export const connection = mongoose.connect(process.env.MONGO_DB_URI as string);

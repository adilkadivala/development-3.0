import dotenv from "dotenv";
dotenv.config();

import express from "express";
import route from "./routes/index";
import { connectDb } from "./config/db";

const server_port = process.env.SERVER_PORT;

const app = express();
app.use(express.json());
app.use(route);

connectDb
  .then(() => {
    console.log("Databse connected");
    app.listen(server_port, () => {
      console.log(`server is running on http://localhost:${server_port}`);
    });
  })
  .catch((err) => {
    console.error(" Database connection error:", err.message);
    process.exit(1);
  });

import env from "dotenv";
env.config();

import express from "express";
import cors from "cors";
import { connection } from "./schema/db";
import routes from "./routes/auth";

const app = express();

app.use(routes);
app.use(express.json());
app.use(cors());

connection.then(() => {
  console.log("database connected successfully");
  app.listen(4000, () => {
    console.log("server is running ");
  });
});

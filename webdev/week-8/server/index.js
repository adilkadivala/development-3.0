require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./src/routes");
const connect = require("./src/db/connect");

const PORT = process.env.SERVER_PORT || 4000;

app.use(express.json());
app.use(router);

// welcome route
app.get("/", (req, res) => {
  res.send("hey! your most welcom to my server");
});

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
  });
});

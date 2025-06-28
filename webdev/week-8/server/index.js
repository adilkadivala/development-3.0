require("dotenv").config();

const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

const PORT = process.env.SERVER_PORT || 4000;
const JWT_sercer = process.env.JWT_SECRET || "thisisjustsecret";

// welcome route

app.get("/", (req, res) => {
  res.send("hey! your most welcomr to my server");
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

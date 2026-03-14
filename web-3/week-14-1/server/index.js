const express = require("express");
const { userModel } = require("./models");
const app = express();
const jwt = require("jsonwebtoken");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/signup", async (req, res) => {
  const { username, password } = req.body;
  const keyPair = generateKeyPair();
  const newUser = await userModel.create({
    username,
    password,
    privateKey: keyPair.privateKey,
    publicKey: keyPair.publicKey,
  });

  res.json({ message: "User created successfully", userId: newUser._id });
});

app.post("/api/v1/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({ username, password });
  if (!user) {
    return res.status(401).send("Invalid credentials");
  }

  const token = jwt.sign({ userId: user._id }, "your_jwt_secret", {
    expiresIn: "1h",
  });

  res.json({ message: "Login successful", token });
});

app.post("/api/v1/sign-tranaction", (req, res) => {
  res.send("Sign Transaction endpoint");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

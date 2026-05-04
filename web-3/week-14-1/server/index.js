require("dotenv").config();
const express = require("express");
// const { userModel } = require("./models");
const app = express();
const bs58 = require("bs58");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { Transaction, Keypair } = require("@solana/web3.js");

app.use(express.json());
app.use(cors());

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

  res.json({
    message: "User created successfully",
    userId: newUser._id,
    pubKey: publicKey,
  });
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

app.post("/api/v1/sign-tranaction", async (req, res) => {
  const serializedTX = req.body.messsage;
  const tx = Transaction.from(Buffer.from(serializedTX));

  const keypair = Keypair.fromSecretKey(bs58.default.decode(process.env.PRIVATEKEY));
  const {blockhash} = await connection.getLatestBlockhash();
  tx.recentBlockhash = blockhash;
  tx.sign(keypair);

  const signature = await connection.sendTransaction(tx, [keypair]);

  console.log(signature);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

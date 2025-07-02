require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { TodoModal, UserModal } = require("./db");
const mongoose = require("mongoose");
const app = express();
const { z } = require("zod");

mongoose.connect(process.env.DATA_BASE_URL);

// server-port + env. variables
const SERVER_PORT = process.env.SERVER_PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || "secret_is_pure-secret";

// middleware
app.use(express.json());

function authmiddleware(req, res, next) {
  const { token } = req.headers;

  const verifyUser = jwt.verify(token, JWT_SECRET);

  if (verifyUser) {
    req.userId = verifyUser.id;
    next();
  } else {
    return res.status(403).json({ message: "you're unauthorised !!" });
  }
}

//welcome
app.get("/", (req, res) => {
  res.send("hey!! welcome");
});

// sign-up
app.post("/sign-up", async (req, res) => {
  const requireBody = z.object({
    name: z.string({ error: "Bad!" }).min(3).max(15),
    email: z.string().min(3).max(50).email(),
    password: z.string().min(3).max(1000).regex(),
  });

  // const parseData = requireBody.parse(req.body);
  const parseData = requireBody.safeParse(req.body);

  if (!parseData.success) {
    res.json({ messgage: "incorrect inputs", error: parseData.error });

    return;
  }

  const { name, email, password } = req.body;
  const hashedPass = await bcrypt.hash(password, 10);

  await UserModal.create({
    name: name,
    email: email,
    password: hashedPass,
  });

  return res.json({ message: "Account created!!" });
});

// sing-in
app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModal.findOne({ email: email });

  if (!user) {
    res.status(403).json({
      message: "User doesn't exist",
    });
    return;
  }

  const checkPass = bcrypt.compare(password, user.password);

  if (checkPass) {
    const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET);
    return res.status(200).json({ token: token });
  } else {
    res.status(403).json({ message: "invalid credentials" });
  }
});

// create-todo
app.post("/todo", authmiddleware, async (req, res) => {
  const { title, done } = req.body;
  const userId = req.userId;
  await TodoModal.create({ title: title, done: done, userId: userId });
  return res.json({ message: "todo created successfully" });
});

// get-todo
app.get("/todos", authmiddleware, async (req, res) => {
  const userId = req.userId;
  const todos = await TodoModal.find({ userId: userId });
  console.log(todos);
  return res.status(200).json({ data: todos });
});

app.listen(SERVER_PORT, () => {
  console.log(`server is running on port http://localhost:${SERVER_PORT}`);
});

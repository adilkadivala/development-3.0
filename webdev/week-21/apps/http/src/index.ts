import express from "express";

const app = express();

app.get("/sign-up", (req, res) => {});
app.get("/sign-in", (req, res) => {});
app.get("/chat", (req, res) => {});
app.get("/", (req, res) => {
  res.send("welcome");
});
app.listen(3001);

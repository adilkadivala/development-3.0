// week-4 for Node.js

// backend status

// middle-ware ::

const express = require("express");
const app = express();
const port = 3000;

// middleware
function isAdult(req, res, next) {
  const age = req.query.age;
  console.log(age);
  if (age > 18) {
    next();
  } else {
    res.status(411).json({ msg: "sorry! you are not old enough" });
  }
}

app.get("/vote", isAdult, async (req, res) => {
  try {
    res.status(200).json({ msg: "You are eligibil for voting" });
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

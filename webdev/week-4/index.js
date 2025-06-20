// week-4 for Node.js

// backend status

// middle-ware ::

// headrs ::
// headers are key-value pair sent by client to server in http request and response, for metadata about request and authentication

/*  headers properties
1. Authorization (Sends the user auth information)
2. Content-Type - Type of information client is sending (json, binary etc)
3. Referer - Which URL is this request coming from
*/
const express = require("express");
const app = express();
const port = 3000;

// middleware
function isAdult(req, res, next) {
  const age = req.query.age;
  if (age > 18) {
    next();
  } else {
    res.status(411).json({ msg: "sorry! you are not old enough" });
  }
}

app.get("/vote", isAdult, async (req, res) => {
  try {
    res.status(200).json({ msg: "You are eligibil for voting" });
    req.emit();
  } catch (error) {
    console.log(error.message);
  }
});

/*
dynamic route

"/post/:id"

*/

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

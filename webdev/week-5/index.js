/* middleware referes to function that have access to req. object and res. object , and next function in the application's request response cycle, 

it can

> modifying req. object
> ending req. to reach out 
> forward the req. by next function

*/

// req object propperties
/*
    req.url = will give on which route request has come 
    req.path = will give on which route request has come 
    req.originalUrl = will give on which route request has come 
*/

/*

cors:: cors stands for cross origin resource sharing


*/

import express from "express";
import fs from "fs";

const app = express();

app.use(express.json());

const port = 3000;

// middleware

let requestCount = 0;

// req. counter middleware
function trackReq(req, res, next) {
  requestCount = requestCount + 1;
  next();
}

// req. modifying
function modifyReq(req, res, next) {
  req.name = "youTheDev";
  next();
}

// ending req. for a reasone

function blockTheUser(req, res, next) {
  if (requestCount < 5) {
    res.send("You are not able to see welcome message, refresh 5 times");
    return;
  }
  next();
}

//
function logIncomingReq(req, res, next) {
  const method = req.method;
  const time = new Date().toLocaleTimeString();
  const host = req.host;
  const routes = req.url;

  const data = `method of request is ${method}, and request time was ${time}, and request url was ${host}, and request came on this route ${routes} \n`;

  fs.appendFile("./logfile.txt", data, "utf-8", (err) => {
    if (err) console.error(err);
  });

  next();
}

// default route
app.get("/", trackReq, modifyReq, blockTheUser, logIncomingReq, (req, res) => {
  res.send("hey your welcome");
});

app.post("/getbody", (req, res) => {
  console.log(req.body);
  const text = req.body.bodyText;
  console.log(text);
  return res.json({ bodyText: text });
});

// server port
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

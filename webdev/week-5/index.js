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

import express from "express";

const app = express();

const port = 3000;

// middleware

let requestCount = 0;

// req. counter middleware
function trackReq(req, res, next) {
  requestCount = requestCount + 1;
  console.log(`total number of requests = ${requestCount} `);
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
    req.emit();
  }
  next();
}

//
function logIncomingReq(req, res, next) {
  console.log("method is " + req.method);
  console.log(new Date().toLocaleTimeString());
  console.log("request comes form " + req.host);
  next();
}

// default route
app.get("/", trackReq, modifyReq, logIncomingReq, (req, res) => {
  res.send("hey your welcome");
  req.emit();
});

// server port
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

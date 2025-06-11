/* middleware referes to function that have access to req. object and res. object , and next function in the application's request response cycle, 

it can

> modifying req. object
> ending req. to reach out 
> forward the req. by next function

*/

import express from "express";

const app = express();

const port = 3000;

// middleware

let requestCount = 0;

function trackReq(req, res, next) {
  requestCount = requestCount + 1;
  console.log(`total number of requests = ${requestCount} `);
  next();
}

app.get("/", trackReq, (req, res) => {
  res.send("hey your welcome");
  req.emit();
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

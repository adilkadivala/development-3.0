// authentication with JWT

const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

// JWT secret

const JWT_SECRET = "secretissecret";

// memory storage for storing useers
const users = [];

// middlewares
app.use(express.json());

// auth middleware

function auth(req, res, next) {
  const { token } = req.headers;
  const verifyUser = jwt.verify(token, JWT_SECRET);
  if (verifyUser.username) {
    req.username = verifyUser.username;
    next();
  } else {
    return res.status(403).json({ message: "you're unauthorised" });
  }
}

// server port
const PORT = 3000;

// generate token
function generateToken(params) {
  let chakBhodi = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
  ];

  let token = "";

  for (let i = 0; i < chakBhodi.length; i++) {
    token += chakBhodi[Math.floor(Math.random() * chakBhodi.length)];
  }
  return token;
}

// welcome route
app.get("/", (req, res) => {
  res.send("welcome to server");
});

// sign-in end point
app.post("/signin", (req, res) => {
  //   const { username, password } = req.body;
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    // const token = generateToken();
    // user.token = token;

    const token = jwt.sign({ username: username }, JWT_SECRET);
    return res.json({ message: token });
  } else {
    return res.status(403).json({ message: "Invalid username or password" });
  }
});

// sign-up end point
app.post("/signup", (req, res) => {
  //   const { username, password } = req.body;
  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username: username,
    password: password,
  });

  res.json({ message: "you're signed up " });
});

// personal info. end point
app.get("/me", auth, (req, res) => {
  // const token = req.headers.token;

  /* 
  before middleware
  const { token } = req.headers;
  
  const verifyUser = jwt.verify(token, JWT_SECRET);
  const userName = verifyUser.username;
  */
  const user = users.find((user) => user.username === req.username);

  return res.json({
    username: user.username,
    password: user.password,
  });
});

app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});

/* self created token V/S jwt token

self-created token is a state-full token, we need to store data in a storage..

jwt token is state-less token, token carried all info. of a user, no more need to store in a storage..

*/

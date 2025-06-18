// authentication with JWT

const express = require("express");
const app = express();

// memory storage for storing useers
const users = [];

// middlewares
app.use(express.json());

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

  console.log(req.body);

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    const token = generateToken();
    user.token = token;
    console.log(user);
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

  console.log(users);

  res.json({ message: "you're signed up " });
});

app.get("/me", (req, res) => {
  
})

app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});

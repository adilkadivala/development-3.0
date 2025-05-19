// function in JS

function sum(a, b) {
  return a + b;
}

// console.log("Answer is ::", sum(5, 6));

// array and objects

let arr = [
  "kadi",
  20,
  {
    name: "adil Kadival",
    age: 20,
    cities: [
      "Lonavala",
      "Bombay Central",
      {
        country: "india",
        city: "Bombay",
        publicPlaces: [
          "Juhu",
          "Gate Of India",
          "Chopati",
          "Merin-Lines",
          { historiaclPlaces: "Tag Hotel" },
        ],
      },
    ],
  },
];

// console.log(arr);
// console.log("\n");
// console.log(...arr);
// console.log("\n");
// console.dir(structuredClone(arr), { depth: null });

// assignment

function check(users) {
  let newUser = [];

  for (let i = 0; i < users.length; i++) {
    if (users[i].age > 18 && users[i].gender === "male") {
      newUser.push(users[i]);
    }
  }

  return newUser;
}

const users = [
  {
    name: "Jhon",
    age: 18,
    gender: "male",
  },
  {
    name: "sofia",
    age: 22,
    gender: "female",
  },
  {
    name: "Jemmy",
    age: 23,
    gender: "male",
  },
];

const verify = check(users);
console.log(verify);

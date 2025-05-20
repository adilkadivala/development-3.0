// reading file

const fs = require("fs");

function readData(err, data) {
  console.log(data);
}

fs.readFile("hello.txt", "utf-8", readData);

// writing file!! This will over-write content..
fs.writeFile("./hello.txt", "it's over-writing", readData);

// if you want to keep past content, and add new then try 'append';
fs.appendFile(
  "./hello.txt",
  "\n Now your old content will be not over-write",
  readData
);

// functional arg..
function sum(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
function mul(a, b) {
  return a * b;
}
function div(a, b) {
  return a / b;
}
function mod(a, b) {
  return a % b;
}

//

function doAction(a, b, Op) {
  return Op(a, b);
}

const result = doAction(5, 3, sum);
console.log(result);

// assignment

// try to create a promisified version of setTimeout, fetch, fs

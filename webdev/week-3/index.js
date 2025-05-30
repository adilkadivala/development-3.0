// DOM -- document object model is a programming interface for web documents,

// for fetcching element

// querySelector  // css
// querySelectAll // css
// getElementById  //
// getElementByClassName
// getElementsByClassName
// getElementsByTagName

// removing element
// destroye
// removeChield()

// let fetch body


// dom-part-2

// created self framwork..

let list = [];

function addTodo() {
  const myEle = document.querySelector("input");
  const myVal = myEle.value;

  list.push(myVal);
}
console.log(list);
const todos = document.createElement("p");
for (let i = 0; i < list.length; i++) {
  console.log(list[i]);
}

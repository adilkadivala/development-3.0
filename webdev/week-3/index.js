// DOM -- document object model is a programming interface for web documents,

// for fetcching element

// querySelector  // css
// querySelectAll // css
// getElementById  //
// getElementByClassName
// getElementsByClassName
// getElementsByTagName

// let fetch body

let list = [];

function addTodo() {
  const myEle = document.querySelector("input");
  const myVal = myEle.value;

  list.push(myVal);
  console.log(myVal);
}

let addinList = document.querySelector("li");

console.log(addinList);

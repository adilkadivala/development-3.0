// arrow function

const arrow = (a, b) => {
  return a + b;
};

// map

/* 

pro. sta.  
given an array, give me back a new array in which every value is multiplied by 2

[1, 2, 3, 4, 5]
[2, 4, 6, 8, 10]

*/

let arr = [1, 2, 3, 4, 5];
let newArr = arr.map((ele) => ele * 2);
console.log(newArr);

// filter

/* 

you have an arr. give me back only even or odd,

[1,2,3,4,5,6,7,8,9]

even = [2,4,6,8]
odd = [1,3,5,7,9]

*/

let ele = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let even = ele.filter((element) => element % 2 == 0);
console.log("even numbers are", even);
let odd = ele.filter((element) => element % 2 != 0);
console.log("odd numbers are", odd);

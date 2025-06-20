// anagram
function isAnagram(str1, str2) {
  let first_str = str1.toLowerCase().split("").sort().join("");
  let second_str = str2.toLowerCase().split("").sort().join("");

  if (first_str === second_str) {
    return true;
  } else {
    return false;
  }
}

let result = isAnagram("adil", "dail");
console.log(result);

// large value
function findLarge(arr) {
  let large = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > large) {
      large = arr[i];
    }
  }
  return large;
}

let arrNum = [5, 3, 1, 9];
const isLarge = findLarge(arrNum);
console.log(isLarge);


// calculateTotalSpentByCategory  I didn't get a point what actually want in this task
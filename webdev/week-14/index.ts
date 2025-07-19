// let x: number = 1;

// console.log(x);

interface People {
  name: string;
  age: number;
  isLegal(): boolean;
}

class Manager implements People {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  isLegal() {
    return this.age > 18;
  }
}

const manager = new Manager("john", 30);

console.log(manager);

// oops
class Shap {
  area() {
    console.log("area");
  }
}

class rectangle extends Shap {
  // inhheritance
  width: number;
  height: number;

  constructor() {
    super(); // this will call parent class constructor if exist ---
    this.height = 2;
    this.width = 2;
  }
}



let arr = [5, 3, 6, 9, 8, 7];
let maxVal = 0;

for (let i = 0; i < arr.length; i++) {
  if (arr[i] > maxVal) {
    maxVal = arr[i];
  }
}

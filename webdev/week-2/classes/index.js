// classes and promises

class Rectngle {
  constructor(width, hight, color) {
    this.width = width;
    this.hight = hight;
    this.color = color;
  }

  area() {
    const area = this.width * this.hight;
    return area;
  }

  print() {
    console.log(`color is ` + this.color);
  }
}

const rect = new Rectngle(6, 6, "red");
const area = rect.area();
const color = rect.print();

console.log(area);

const map = new Map();
map.set("name", "k-adi");
map.set("age", 50);

const myname = map.get("name");
const myage = map.get("age");

console.log(myname);
console.log(myage);

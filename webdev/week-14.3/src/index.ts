interface User {
  name: string;
  age: number;
}

function sunOfAge(user1: User, user2: User) {
  return user1.age + user2.age;
}

const age = sunOfAge({ name: "john", age: 35 }, { name: "joseph", age: 20 });

console.log(age);

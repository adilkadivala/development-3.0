"use strict";
function sunOfAge(user1, user2) {
    return user1.age + user2.age;
}
const age = sunOfAge({ name: "john", age: 35 }, { name: "joseph", age: 20 });
console.log(age);

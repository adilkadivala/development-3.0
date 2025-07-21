interface USER {
  name: string;
  age: number;
}

function sunOfAge(user1: USER, user2: USER) {
  return user1.age + user2.age;
}

const age = sunOfAge({ name: "john", age: 35 }, { name: "joseph", age: 20 });

console.log(age);

/*

 // pick

 /* 

 we have a user table in database,now want to update a user data but not in all fileds then we use pick

 */

interface User {
  id: string;
  name: string;
  age: number;
  email: string;
  passwrod: string;
}

type UpdateUser = Pick<User, "name" | "age" | "email" | "passwrod">;
function updateUser(updateProps: UpdateUser) {}

updateUser({
  age: 20,
  email: "@gmail.com",
  name: "user",
  passwrod: "123#snfjsf",
});

// so we clearly see here that pick is an api to pickup values from interface

/* */

// Partial

/* 

in above given example is not necessory that user update every time four fields , may be just name and age, or may be name , age, and email, and may be just password ...

so all fileds are required untill now but partial makes fileds optional...

*/

type UpdateUserOptional = Partial<UpdateUser>;

function updateUserOp(updateProps: UpdateUserOptional) {}

updateUserOp({
  age: 20,
  name: "user",
});

updateUserOp({
  email: "@gmail.com",
  passwrod: "123#snfjsf",
});

// readonly

/*

if we want to make filed constant in side type, then readonly will help, at the moment we can't update that field


*/

type UserReadonly = {
  readonly id: string;
  readonly role: string;
  name: string;
  age: number;
};

const UserRead: UserReadonly = {
  age: 16,
  name: "raman",
  id: "12#44f",
  role: "student",
};

UserRead.name = "jamin";
UserRead.role = "admin";

//

// record and map

type Users = Record<string, string>;

// key value both are string

const user: Users = {
  name: "raman",
  email: "raman@gmail.com",
};

// map ---- map is another key value paires

type USERS = {
  name: string;
  age: number;
  email: string;
};

const users = new Map<string | USERS>();

users.set("1daa", { name: "raman", age: 20, email: "raman@gmail.com" });
users.set("2dasdsad", { name: "raman", age: 20, email: "raman@gmail.com" });

const uSEr = users.get("1daa");
console.log(uSEr);
//


// type infer in zod

/*

import z from 'zod';

const userProfile = z.object({
name:z.string(),
email:z.string(),
password:z.string(),
});


type USerProfile = z.infer<typeof userProfile>; 


z.infer will infer types of fields, we no need more to define separatly again....

*/
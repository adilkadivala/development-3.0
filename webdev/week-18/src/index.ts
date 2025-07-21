import { PrismaClient } from "../src/generated/prisma";

const client = new PrismaClient();

async function getuser() {
  const user = await client.user.findFirst({
    where: { id: 1 }, // all columns if not use select bracket
  });

  console.log(user?.username);
  console.log(user?.email);
}

async function getuserSpecifcFileds() {
  const user = await client.user.findFirst({
    where: { id: 1 }, // all columns if not use select bracket
    select: { username: true, email: true }, // select random columns from table
  });

  console.log(user?.username);
  console.log(user?.email);
}

async function getuserwithrelatedData() {
  const user = await client.user.findFirst({
    where: { id: 1 }, // all columns if not use select bracket
    include: {
      Todo: true,
    },
  });

  console.log(user);
}
async function CreateUser() {
  await client.user.create({
    data: {
      username: "adil",
      password: "adil@1234",
      email: "adil@0gmail.com",
    },
  });
}

async function DeleteUser() {
  await client.user.delete({
    where: { id: 1 },
  });
}

async function UpdateUser() {
  await client.user.update({
    where: { id: 1 },
    data: {
      username: "john",
    },
  });
}

getuserwithrelatedData();

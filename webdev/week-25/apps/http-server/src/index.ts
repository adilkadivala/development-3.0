import express from "express";
import { client } from "@repo/prisma/client";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/sign-up", async (req, res) => {
  const { name, email, password } = req.body;

 const user = await client.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  res.status(201).json({ message: "User created successfully", id: user.id });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

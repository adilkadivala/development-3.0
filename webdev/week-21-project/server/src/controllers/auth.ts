import { Request, Response } from "express";
import zod from "zod";
import jwt from "jsonwebtoken";
import { Users } from "../schema/schema";

const JWT_SECRET = process.env.JWT_SECRET!;

const signUpSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
});

// signUp

const signUp = async (req: Request, res: Response): Promise<Response> => {
  const body = req.body;
  const { success } = signUpSchema.safeParse(req.body);
  if (!success) {
    return res.json({
      message: "Email Already exist, in correct input",
    });
  }

  const user = await Users.findOne({
    username: body.username,
  });

  if (user?._id) {
    return res.json({
      message: "Email Already exist, in correct input",
    });
  }

  const dbUser = await Users.create(body);
  const token = jwt.sign(
    {
      userId: dbUser._id,
    },
    JWT_SECRET
  );

  return res
    .status(200)
    .json({ message: "account created successfully", token });
};

export { signUp };

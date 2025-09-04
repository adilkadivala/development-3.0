import type { Request, Response } from "express";
import { UserModel } from "../../config/schema/user";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET!;

const signIn = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const isUserExist = await UserModel.findOne({
      username: username,
      password: password,
    });

    if (isUserExist) {
      const token = jwt.sign({ id: isUserExist._id }, secret);
      return res.status(200).json(token);
    }

    return res.status(403).json({ message: "credentials not matched" });
  } catch (error: any) {
    console.log(error.message);
  }
};

export default signIn;

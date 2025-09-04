import type { Request, Response } from "express";
import { UserModel } from "../../config/schema/user";

const signUp = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;

    const isUserExist = await UserModel.findOne({ email: email });

    if (isUserExist) {
      return res.status(401).json({ message: "User already Exists" });
    }

    await UserModel.create({
      username: username,
      email: email,
      password: password,
    });

    return res.status(200).json({ message: "account create" });
  } catch (error: any) {
    console.log(error.message);
  }
};

export default signUp;

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const user_secret = process.env.JWT_SECRET!;

export const UserMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headers = req.headers["authorization"];
  const decoded = jwt.verify(headers as string, user_secret);

  if (decoded) {
    //@ts-ignore
    req.userId = decoded.id;
    next();
    return;
  }

  return res.status(403).json({ message: "You're not logged in " });
};

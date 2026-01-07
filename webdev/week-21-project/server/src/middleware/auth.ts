import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Make sure JWT_SECRET is defined
const JWT_SECRET = process.env.JWT_SECRET as string;

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(403).json({ message: "Unauthorized header" });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(403).json({ message: "Token missing" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "object" && "userId" in decoded) {
      req.userId = (decoded as JwtPayload).userId as string;
      next();
    } else {
      res.status(403).json({ message: "Invalid token payload" });
      return;
    }
  } catch (error) {
    res.status(403).json({ message: "Invalid token" });
    return;
  }
};

export { authMiddleware };

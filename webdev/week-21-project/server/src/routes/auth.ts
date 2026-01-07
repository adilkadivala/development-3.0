import express, { Router } from "express";
import { signUp } from "../controllers/auth";
import { authMiddleware } from "../middleware/auth";

const authRouter: Router = express.Router();

authRouter.route("/api/v1").get(authMiddleware, signUp);

export default authRouter;

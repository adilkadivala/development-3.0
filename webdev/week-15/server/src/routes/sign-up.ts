import express from "express";
import signUp from "../controllers/auth/sign-up";
const SignUpRouter = express.Router();

SignUpRouter.route("/api/v1/signup").post(signUp);

export { SignUpRouter };

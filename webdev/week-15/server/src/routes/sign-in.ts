import express from "express";
import signIn from "../controllers/auth/sign-in";
const SignInRouter = express.Router();

SignInRouter.route("/api/v1/signin").post(signIn);

export { SignInRouter };

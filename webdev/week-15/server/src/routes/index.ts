import express from "express";
import { SignUpRouter } from "./sign-up";
import { SignInRouter } from "./sign-in";
import { ContentRouter } from "./content";

const router = express.Router();

router.use(SignUpRouter);
router.use(SignInRouter);
router.use(ContentRouter);

export default router;

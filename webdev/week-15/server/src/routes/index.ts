import express from "express";
import { SignUpRouter } from "./sign-up";
import { SignInRouter } from "./sign-in";
import { ContentRouter } from "./content";
import { LinkRouter } from "./link";

const router = express.Router();

router.use(SignUpRouter);
router.use(SignInRouter);
router.use(ContentRouter);
router.use(LinkRouter);

export default router;

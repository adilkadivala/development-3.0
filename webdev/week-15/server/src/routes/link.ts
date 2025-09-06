import express from "express";
import { createLink, shareLink } from "../controllers/content/link";
import { UserMiddleware } from "../middleware/user";
const LinkRouter = express.Router();

LinkRouter.route("/api/v1/createlink").post(UserMiddleware, createLink);
LinkRouter.route("/api/v1/sharelink/:hash").get(UserMiddleware, shareLink);

export { LinkRouter };

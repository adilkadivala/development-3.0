import express from "express";
import {
  createContent,
  getContent,
  deleteContent,
} from "../controllers/content/content";
import { UserMiddleware } from "../middleware/user";
const ContentRouter = express.Router();

ContentRouter.route("/api/v1/createcontent").post(
  UserMiddleware,
  createContent
);

ContentRouter.route("/api/v1/getcontent").get(UserMiddleware, getContent);

ContentRouter.route("/api/v1/deletecontent/:contentId").delete(
  UserMiddleware,
  deleteContent
);

export { ContentRouter };

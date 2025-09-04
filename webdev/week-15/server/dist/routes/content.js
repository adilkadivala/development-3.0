"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentRouter = void 0;
const express_1 = __importDefault(require("express"));
const content_1 = require("../controllers/content/content");
const user_1 = require("../middleware/user");
const ContentRouter = express_1.default.Router();
exports.ContentRouter = ContentRouter;
ContentRouter.route("/api/v1/createcontent").post(user_1.UserMiddleware, content_1.createContent);
ContentRouter.route("/api/v1/getcontent").get(user_1.UserMiddleware, content_1.getContent);
ContentRouter.route("/api/v1/deletecontent/:contentId").delete(user_1.UserMiddleware, content_1.deleteContent);
//# sourceMappingURL=content.js.map
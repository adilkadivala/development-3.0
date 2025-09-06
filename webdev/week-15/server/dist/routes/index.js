"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sign_up_1 = require("./sign-up");
const sign_in_1 = require("./sign-in");
const content_1 = require("./content");
const link_1 = require("./link");
const router = express_1.default.Router();
router.use(sign_up_1.SignUpRouter);
router.use(sign_in_1.SignInRouter);
router.use(content_1.ContentRouter);
router.use(link_1.LinkRouter);
exports.default = router;
//# sourceMappingURL=index.js.map
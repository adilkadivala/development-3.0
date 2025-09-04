"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpRouter = void 0;
const express_1 = __importDefault(require("express"));
const sign_up_1 = __importDefault(require("../controllers/auth/sign-up"));
const SignUpRouter = express_1.default.Router();
exports.SignUpRouter = SignUpRouter;
SignUpRouter.route("/api/v1/signup").post(sign_up_1.default);
//# sourceMappingURL=sign-up.js.map
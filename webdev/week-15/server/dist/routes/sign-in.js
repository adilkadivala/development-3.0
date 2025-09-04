"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInRouter = void 0;
const express_1 = __importDefault(require("express"));
const sign_in_1 = __importDefault(require("../controllers/auth/sign-in"));
const SignInRouter = express_1.default.Router();
exports.SignInRouter = SignInRouter;
SignInRouter.route("/api/v1/signin").post(sign_in_1.default);
//# sourceMappingURL=sign-in.js.map
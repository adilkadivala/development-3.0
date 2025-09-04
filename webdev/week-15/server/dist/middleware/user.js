"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_secret = process.env.JWT_SECRET;
const UserMiddleware = (req, res, next) => {
    const headers = req.headers["authorization"];
    const decoded = jsonwebtoken_1.default.verify(headers, user_secret);
    if (decoded) {
        //@ts-ignore
        req.userId = decoded.id;
        next();
        return;
    }
    return res.status(403).json({ message: "You're not logged in " });
};
exports.UserMiddleware = UserMiddleware;
//# sourceMappingURL=user.js.map
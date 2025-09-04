"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../config/schema/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        const isUserExist = await user_1.UserModel.findOne({
            username: username,
            password: password,
        });
        if (isUserExist) {
            const token = jsonwebtoken_1.default.sign({ id: isUserExist._id }, secret);
            return res.status(200).json(token);
        }
        return res.status(403).json({ message: "credentials not matched" });
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.default = signIn;
//# sourceMappingURL=sign-in.js.map
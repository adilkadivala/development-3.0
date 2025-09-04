"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../../config/schema/user");
const signUp = async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const isUserExist = await user_1.UserModel.findOne({ email: email });
        if (isUserExist) {
            return res.status(401).json({ message: "User already Exists" });
        }
        await user_1.UserModel.create({
            username: username,
            email: email,
            password: password,
        });
        return res.status(200).json({ message: "account create" });
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.default = signUp;
//# sourceMappingURL=sign-up.js.map
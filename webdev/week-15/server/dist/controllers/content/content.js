"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContent = exports.getContent = exports.createContent = void 0;
const content_1 = require("../../config/schema/content");
const createContent = async (req, res) => {
    try {
        const { link, title, tags } = req.body;
        await content_1.ContentModal.create({
            title,
            link,
            tags,
            //   @ts-ignore
            userId: req.userId,
        });
        return res.status(200).json({ message: "memorry created" });
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.createContent = createContent;
const getContent = async (req, res) => {
    try {
        // @ts-ignore
        const userId = req.userId;
        const content = await content_1.ContentModal.find({
            userId: userId,
        }).populate("userId", "username");
        return res.status(200).json(content);
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.getContent = getContent;
const deleteContent = async (req, res) => {
    try {
        const { contentId } = req.params;
        // @ts-ignore
        const userId = req.userId;
        await content_1.ContentModal.deleteOne({
            _id: contentId,
            userId: userId,
        });
        return res.status(200).json("memory deleted successfully");
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.deleteContent = deleteContent;
//# sourceMappingURL=content.js.map
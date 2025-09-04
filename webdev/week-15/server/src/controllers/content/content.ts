import type { Request, Response } from "express";
import { ContentModal } from "../../config/schema/content";

const createContent = async (req: Request, res: Response) => {
  try {
    const { link, title, tags } = req.body;
    await ContentModal.create({
      title,
      link,
      tags,
      //   @ts-ignore
      userId: req.userId,
    });

    return res.status(200).json({ message: "memorry created" });
  } catch (error: any) {
    console.log(error.message);
  }
};

const getContent = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const content = await ContentModal.find({
      userId: userId,
    }).populate("userId", "username");

    return res.status(200).json(content);
  } catch (error: any) {
    console.log(error.message);
  }
};

const deleteContent = async (req: Request, res: Response) => {
  try {
    const { contentId } = req.params;
    // @ts-ignore
    const userId = req.userId;
    await ContentModal.deleteOne({
      _id: contentId,
      userId: userId,
    });

    return res.status(200).json("memory deleted successfully");
  } catch (error: any) {
    console.log(error.message);
  }
};

export { createContent, getContent, deleteContent };

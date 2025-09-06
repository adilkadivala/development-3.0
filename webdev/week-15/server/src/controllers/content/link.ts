import type { NextFunction, Request, Response } from "express";
import { LinkModal } from "../../config/schema/link";
import { random } from "../../config/utils";
import { ContentModal } from "../../config/schema/content";
import { UserModel } from "../../config/schema/user";

const createLink = async (req: Request, res: Response) => {
  try {
    const { share } = req.body;
    const hash = random(10);
    if (share) {
      await LinkModal.create({
        //   @ts-ignore
        userId: req.userId,
        hash: hash,
      });
      return res.status(200).json({ message: "link created", hash });
    } else {
      await LinkModal.deleteOne({
        //   @ts-ignore
        userId: req.userId,
      });
      return res.status(200).json({ message: "link removed" });
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

const shareLink = async (req: Request, res: Response) => {
  try {
    const { hash } = req.params;
    const link = await LinkModal.findOne({ hash });

    if (!link) {
      res.status(411).json({ message: "Sorry! incorrect input" });
      return;
    }

    const content = await ContentModal.find({ userId: link.userId });
    const user = await UserModel.findOne({ _id: link.userId });

    res.json({ username: user?.username, content: content });
  } catch (error: any) {
    console.log(error.message);
  }
};

export { createLink, shareLink };

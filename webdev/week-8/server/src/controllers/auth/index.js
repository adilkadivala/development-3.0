const jwt = require("jsonwebtoken");
const user_secret = process.env.JWT_SECRET_USER;
const { z } = require("zod");
const bcrypt = require("bcrypt");
const { userModel } = require("../../db/schema");

// sign-in
const signIn = async (req, res) => {
  try {
    const verifyField = z.object({
      email: z.string().email(),
      password: z
        .string()
        .min(5, { message: "password atleast should long then 5 char." })
        .max(100, { message: "password should not long then 100 char." }),
    });

    const verifiedData = verifyField.safeParse(req.body);

    if (!verifiedData.success) {
      res.json({ messgage: "incorrect inputs", error: verifiedData.error });
      return;
    }
    const { email, password } = req.body;

    const user = await userModel.findOne({ email: email });

    if (!user) {
      res.status(403).json({ message: "user not found" });
    }

    const verifyUser = await bcrypt.compare(password, user.password);

    if (verifyUser) {
      const token = jwt.sign({ id: user._id.toString() }, user_secret);
      return res.status(200).json({ token: token });
    } else {
      return res.status(403).json({ message: "invalid cradentials" });
    }
  } catch (error) {
    console.log(error.message);
  }
};

//sign-up
const signUp = async (req, res) => {
  try {
    const verifiedField = z.object({
      firstName: z
        .string()
        .min(3, { message: "first name atleast should greater then 3 char." })
        .max(10, { message: "first name should not long then 10 char." }),
      lastName: z
        .string()
        .min(3, { message: "last name atleast should greater then 3 char." })
        .max(10, { message: "last name should not long then 10 char." }),
      email: z.string().email(),
      password: z
        .string()
        .min(5, { message: "password atleast should long then 5 char." })
        .max(100, { message: "password should not long then 100 char." }),
    });

    const verifiedData = verifiedField.safeParse(req.body);

    if (!verifiedData.success) {
      res.json({
        messgage: "incorrect inputs",
        error: verifiedData.error.issues,
      });
      return;
    }

    const { firstName, lastName, email, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPass,
    });

    res.send({ message: "sign-up successed" });
  } catch (error) {
    console.log(error.message);
  }
};

//me
const userDetail = async (req, res) => {
  try {
    
    const userId = req.userId;
  
    const user = await userModel.findOne({
      _id: userId,
    });
    res.send({ user: user });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  signIn,
  signUp,
  userDetail,
};

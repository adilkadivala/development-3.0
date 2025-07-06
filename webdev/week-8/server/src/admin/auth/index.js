const jwt = require("jsonwebtoken");
const admin_sercet = process.env.JWT_SECRET_ADMIN;
const { z, string } = require("zod");
const bcrypt = require("bcrypt");
const { adminModel } = require("../../db/schema");

// sign-in
const signIn = async (req, res) => {
  try {
    const verifiedField = z.object({
      email: string().email(),
      password: z
        .string()
        .min(5, { message: "password should be greater then 5 char." })
        .max(100, { message: "password shouldn't be greater then 100 char." }),
    });

    const verifiedData = verifiedField.safeParse(req.body);

    if (!verifiedData.success) {
      res.json({ message: "incorrect inputs", error: verifiedData.error });
      return;
    }

    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email: email });

    if (!admin) {
      res.json({ message: "admin not found" });
      return;
    }

    const verifyAdmin = await bcrypt.compare(password, admin.password);

    if (verifyAdmin) {
      const token = await jwt.sign({ id: admin._id.toString() }, admin_sercet);
      res.send({ toekn: token });
    } else {
      res.send({ message: "invalid cradentials" });
    }
  } catch (error) {
    console.log(error);
  }
};

//sign-up
const signUp = async (req, res) => {
  try {
    const verifiedField = z.object({
      firstName: z
        .string()
        .min(3, { message: "first name should be greater then 3 char." })
        .max(10, { message: "first name shouldn't be greater then 10 char." }),
      lastName: z
        .string()
        .min(3, { message: "last name should be greater then 3 char." })
        .max(10, { message: "last name shouldn't be greater then 10 char." }),
      email: z.string().email(),
      password: z
        .string()
        .min(5, { message: "password should be greater then 5 char." })
        .max(100, { message: "password shouldn't be greater then 100 char." }),
    });

    const verifiedData = verifiedField.safeParse(req.body);

    if (!verifiedData.success) {
      res.json({ messgage: "incorrect inputs", error: verifiedData.error });
      return;
    }

    const { firstName, lastName, email, password } = req.body;

    const hashedPass = await bcrypt.hash(password, 10);

    await adminModel.create({
      firstName,
      lastName,
      email,
      password: hashedPass,
    });

    res.status(200).json({ message: "admin signed up" });
  } catch (error) {
    console.log(error.message);
  }
};

//admin-details
const adminDetail = async (req, res) => {
  try {
    const adminId = req.adminId;

    const admin = await adminModel.findOne({
      _id: adminId,
    });

    res.status(200).json({ admin: admin });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  signIn,
  signUp,
  adminDetail,
};

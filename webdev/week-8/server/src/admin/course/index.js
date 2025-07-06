const { coursesModel } = require("../../db/schema");
const z = require("zod");

// get all course
const getCourses = async (req, res) => {
  try {
    const course = await coursesModel.find();
    res.send({ course: course });
  } catch (error) {
    console.log(error.message);
  }
};

// update courses
const updateCourses = async (req, res) => {
  try {
    const verifyFields = z.object({
      title: z.string(),
      description: z.string(),
      price: z.number(),
      imgUrl: z.string(),
      courseId: z.string(),
    });

    const verifyData = verifyFields.safeParse(req.body);

    if (!verifyData.success) {
      res.json({ messagge: verifyData.error.errors });
      return;
    }

    const adminId = req.adminId;
    const { title, description, price, imgUrl, courseId } = req.body;

    const course = await coursesModel.updateOne(
      {
        _id: courseId,
        creater: adminId,
      },
      {
        title,
        description,
        price,
        imgUrl,
      }
    );

    return res
      .status(200)
      .json({ message: "course updated successfully", course: course._id });
  } catch (error) {
    console.log(error.message);
  }
};

// create courses
const createCourses = async (req, res) => {
  try {
    const verifyFields = z.object({
      title: z.string(),
      description: z.string(),
      price: z.number(),
      imgUrl: z.string(),
    });

    const verifyData = verifyFields.safeParse(req.body);

    if (!verifyData.success) {
      res.json({ messagge: verifyData.error.errors });
      return;
    }

    const adminId = req.adminId;
    const { title, description, price, imgUrl } = req.body;

    const course = await coursesModel.create({
      title,
      description,
      price,
      imgUrl,
      creater: adminId,
    });

    return res.status(200).json({ course: course._id });
  } catch (error) {
    console.log(error);
  }
};

// purcahse courses
const deleteCourses = async (req, res) => {
  try {
    const verifyFields = z.object({
      courseId: z.string(),
    });

    const verifyData = verifyFields.safeParse(req.body);

    if (!verifyData.success) {
      res.json({ messagge: verifyData.error.errors });
      return;
    }

    const adminId = req.adminId;
    const { courseId } = req.body;

    const course = await coursesModel.deleteOne({
      _id: courseId,
      creater: adminId,
    });

    res
      .status(200)
      .json({ course: course._id, message: "course deleted successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getCourses,
  updateCourses,
  createCourses,
  deleteCourses,
};

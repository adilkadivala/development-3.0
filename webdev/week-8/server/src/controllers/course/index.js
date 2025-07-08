const { purchasesModel, coursesModel, userModel } = require("../../db/schema");

// get all course
const getCourses = async (req, res) => {
  try {
    const course = await coursesModel.find();
    res.send({ course: course });
  } catch (error) {
    console.log(error.message);
  }
};

// purcahse courses
const purchaseCourses = async (req, res) => {
  try {
    const userId = req.userId;
    const { courseId } = req.body;

    const purchase = await purchasesModel.create({
      courseId,
      userId,
    });

    res.send({ messagge: "congratulation", purchase });
  } catch (error) {
    console.log(error.message);
  }
};

// purcahse courses
const showPurchaseCourses = async (req, res) => {
  try {
    const userId = req.userId;

    const myPurchases = await purchasesModel.find({ userId });

    const courseDetail = await coursesModel.find({
      _id: { $in: myPurchases.map((course) => course.courseId) },
    });
    const userDetail = await userModel.find({
      _id: { $in: myPurchases.map((user) => user.userId) },
    });

    res.send({
      messagge: "this is user purchase cart",
      myPurchases,
      courseDetail,
      userDetail,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getCourses, purchaseCourses, showPurchaseCourses };

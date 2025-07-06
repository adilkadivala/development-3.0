const { purchasesModel } = require("../../db/schema");

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
    res.send({ messagge: "this is user purchase cart", myPurchases });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getCourses, purchaseCourses, showPurchaseCourses };

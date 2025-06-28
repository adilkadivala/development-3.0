// get all course
const getCourses = async (req, res) => {
  try {
    res.send({ messagge: "this is getting all course end-point" });
  } catch (error) {
    console.log(error);
  }
};

// purcahse courses
const purchaseCourses = async (req, res) => {
  try {
    res.send({ messagge: "this is purchase course end-point" });
  } catch (error) {
    console.log(error);
  }
};

// purcahse courses
const showPurchaseCourses = async (req, res) => {
  try {
    res.send({ messagge: "this is user purchase course end-point" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getCourses, purchaseCourses, showPurchaseCourses };

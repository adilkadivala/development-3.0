// get all course
const getCourses = async (req, res) => {
  try {
    res.send({ messagge: "this is getting all course end-point" });
  } catch (error) {
    console.log(error);
  }
};

// purcahse courses
const updateCourses = async (req, res) => {
  try {
    res.send({ messagge: "this is purchase course end-point" });
  } catch (error) {
    console.log(error);
  }
};

// purcahse courses
const createCourses = async (req, res) => {
  try {
    res.send({ messagge: "this is user purchase course end-point" });
  } catch (error) {
    console.log(error);
  }
};

// purcahse courses
const deleteCourses = async (req, res) => {
  try {
    res.send({ messagge: "this is user purchase course end-point" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCourses,
  updateCourses,
  createCourses,
  deleteCourses,
};

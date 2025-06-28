const express = require("express");
const router = express.Router();
const courses = require("../controllers/course");
const auth = require("../controllers/auth");

router.route("/api/v1/getcourses").get(courses.getCourses);
router.route("/api/v1/purchasecourses").post(courses.purchaseCourses);
router.route("/api/v1/showpurchasecourses").get(courses.showPurchaseCourses);

router.route("/api/v1/sign-in").post(auth.signIn);
router.route("/api/v1/sign-up").post(auth.signUp);

module.exports = router;

const router = require("express").Router();
const surveyRoutes = require("./surveys");
const userRoutes = require("./users")
const scoreRoutes = require("./scores")

// Routes
router.use("/surveys/", surveyRoutes);
router.use("/users/", userRoutes)
router.use("/scores/", scoreRoutes)

module.exports = router;
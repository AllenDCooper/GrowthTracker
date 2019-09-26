const router = require("express").Router();
const surveyRoutes = require("./surveys");
const userRoutes = require("./users")

// Routes
router.use("/surveys/", surveyRoutes);
router.use("/users/", userRoutes)

module.exports = router;
const router = require("express").Router();
const surveyRoutes = require("./surveys");

// Book routes
router.use("/surveys/", surveyRoutes);

module.exports = router;
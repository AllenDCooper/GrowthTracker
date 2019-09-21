const router = require("express").Router();
const surveysController = require("../../controllers/surveysController.js");

// Matches with "/api/surveys"
router.route("/")
  .get(surveysController.findAll)

  router.route("/:id")
  .put(surveysController.update)

// Matches with "/api/surveys/:id"
// router
//   .route("/:id")
//   .get(surveysController.findById)
//   .put(surveysController.update)
//   .delete(surveysController.remove);

module.exports = router;

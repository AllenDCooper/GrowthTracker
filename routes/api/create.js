const router = require("express").Router();
const createController = require("../../controllers/createController.js");

// Matches with "/api/create/"
router.route("/")
    .put(createController.update)

// Matches with "/api/create/:id"
router
  .route("/:id")
  .get(createController.findById)

module.exports = router;
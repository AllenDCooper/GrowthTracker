const router = require("express").Router();
const usersController = require("../../controllers/usersController.js");

// Matches with "/api/surveys"
// router.route("/")
//   .get(usersController.findAll)

// Matches with "/api/surveys/:id"
router
  .route("/:id")
  .get(usersController.findById)
//   .put(usersController.update)
//   .delete(usersController.remove);

module.exports = router;
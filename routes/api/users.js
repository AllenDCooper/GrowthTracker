const router = require("express").Router();
const usersController = require("../../controllers/usersController.js");

// Matches with "/api/users/"
router.route("/")
    // .get(usersController.findAll)
    .put(usersController.update)

router.route("/scores/")
// .get(usersController.findAll)
  .put(usersController.updateScore)

// Matches with "/api/users/:id"
router
  .route("/:id")
  .get(usersController.findById)
//   .put(usersController.update)
//   .delete(usersController.remove);

module.exports = router;
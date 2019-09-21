const router = require("express").Router();
const scoresController = require("../../controllers/scoresController.js");

// Matches with "/api/surveys"
router.route("/")
  .post(scoresController.create)

module.exports = router;

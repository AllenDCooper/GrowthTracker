const db = require("../models");

// Defining methods for the ExamplesController.
module.exports = {
  create: function(req, res) {
    db.User
    .findOne({ username: username }, (err, user) => {
      if (err) {
        console.log("User.js post error: ", err)
      } else if (user) {
        res.json({
          error: "Sorry, already a user with username" + username
        })
      } else {
        const newUser = new User({
          username: username,
          password: password
        })
        newUser.save((err, savedUser) => {
          if (err) return res.json(err)
          res.json(savedUser)
        })
      }
    })
  },
  findById: function(req, res) {
    db.User
    .findOne({ _id: req.params.id }).populate("savedSurveys")
    .then(userDocument => res.json(userDocument))
    .catch(err => res.status(422).json(err))
  },
  update: function(req, res) {
    db.User
    .findOneAndUpdate({ _id: req.body.userID }, {$pull: {savedSurveys: req.body.surveyID}}, {new: true} )
    .populate("savedSurveys")
    .then(userDocument => res.json(userDocument))
    .catch(err => res.status(422).json(err));
  },
  updateScore: function(req, res) {
    db.User
    .findOneAndUpdate({ _id: req.body.userID }, {$push: {scores: req.body.scoresID}}, {new: true} )
    .then(userDocument => res.json(userDocument))
    .catch(err => res.status(422).json(err));
  }
};

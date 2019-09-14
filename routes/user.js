const path = require("path");
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

router.post("/", (req, res) => {
  console.log("user signup");

  const { username, password } = req.body;
  console.log("username: " + username);

  User.findOne({ username: username }, (err, user) => {
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
})

router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log("error: " + err)
    } else {
      res.json({users})
    }
  });
});

module.exports = router;
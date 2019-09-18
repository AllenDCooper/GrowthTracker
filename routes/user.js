const path = require("path");
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("../passport");

// route for handling new user signup
router.post("/", (req, res) => {
  console.log("user signup");

  const { username, password, firstName, lastName, organization } = req.body;
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
        password: password,
        firstName: firstName,
        lastName: lastName,
        organization: organization
      })
      newUser.save((err, savedUser) => {
        if (err) return res.json(err)
        // use req.login to log user into the account just created
        req.login(savedUser, function(err) {
          if (err) {
            console.log(err);
          }
          return res.json(savedUser)
        });
      })
    }
  })
})

// post route for handling login, using passport local
router.post("/login/", 
  function (req, res, next) {
    console.log("routes/user.js, login, req.body: ");
    console.log(req.body);
    next();
  },
  // authenticate with local strategy
  passport.authenticate("local"),
  (req, res) => {
    console.log("logged in", req.user);
    var userInfo = {
      username: req.user.username
    }
    res.send(userInfo);
  }
)

// route for handling 
router.get('/', (req, res, next) => {
  console.log("-----user!-----");
  console.log(req.user);
  if(req.user) {
    res.json({ user: req.user })
  } else {
    res.json({ user: null })
  }
});

// route for handling logging out
router.post("/logout", (req, res) => {
  if (req.user) {
    req.logout()
    res.send({ msg: "logging out" })
  } else {
    res.send({ msg: "no user to log out"})
  }
})

module.exports = router;
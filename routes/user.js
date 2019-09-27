const path = require("path");
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("../passport");
var { check, validationResult } = require("express-validator");

// Route for handling new user signup.
router.post("/", [
  // Email must be an email.
  check("username", "Email field cannot be empty").not().isEmpty(),
  check("username", "Invalid email please verify the email address you have provided").isEmail(),
  check("username", "Email address must be between 4-100 characters long, please try again").isLength({ min: 5, max: 100 }),
  // password must be at least 5 chars long
  check("password", "Password must be between 8-100 characters long").isLength({ min: 8, max: 100 }),
  check("password", "Password must include one lowercase character, one uppercase character,and a number.").matches(("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})")),
  check("password").custom(function (value, { req }) {
      if (value !== req.body.confirmPassword) {
          throw new Error("Password confirmation is incorrect, please try again");
      } else return true;
  })
],(req, res) => {
  var errors = validationResult(req);
  if (!errors.isEmpty()) {

      return res.json(errors)

  } else {
    console.log("User signup");

    const { username, password, firstName, lastName, organization } = req.body;
    console.log("Username: " + username);

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
          // Use req.login to log user into the account just created.
          req.login(savedUser, function(err) {
            if (err) {
              console.log(err);
            }
            return res.json(savedUser)
          });
        })
      }
    })
  }
})


// Post route for handling login, using passport local.
router.post("/login/", 
  function (req, res, next) {
    console.log("routes/user.js, login, req.body: ");
    console.log(req.body);
    next();
  },
  // Authenticate with local strategy.
  passport.authenticate("local"),
  (req, res) => {
    console.log("logged in", req.user);
    var userInfo = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      organization: req.user.organization,
      username: req.user.username,
      userID: req.user._id
    }
    res.json(userInfo);
  }
)

// Route for handling.
router.get('/', (req, res, next) => {
  console.log("-----user!-----");
  console.log(req.user);
  if(req.user) {
    res.json({ user: req.user })
  } else {
    res.json({ user: null })
  }
});

// Route for handling saving of surveys.
router.put("/", (req, res) => {
  console.log("-----saved survey-----");
  console.log(req.body)
  // find user record in database and add survey
  User.findOneAndUpdate({ _id: req.body.userID}, {$push: { savedSurveys: req.body.surveyID }} )
  .then(userDocument => res.json(userDocument))
  .catch(err => res.status(422).json(err));
})

// Route for handling logging out.
router.post("/logout", (req, res) => {
  if (req.user) {
    req.logout()
    req.session.destroy(function (err) {
      console.log(err);
    });
    res.send({ msg: "logging out" })
  } else {
    res.send({ msg: "no user to log out"})
  }
})

module.exports = router;
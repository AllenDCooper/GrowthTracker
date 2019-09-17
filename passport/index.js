const passport = require("passport");
// require local strategy
const LocalStrategy = require("./localStrategy");
const User = require ("../models/user");

// called on login, saves the ide to the session req.session.passport.user = { id: ".."}
passport.serializeUser((user, done) => {
  console.log("---serializeUser called, user: ");
  console.log(user);
  console.log("-------");
  done(null, { _id: user._id })
})

passport.deserializeUser((id, done) => {
  console.log("DeserializeUser called")
  User.findOne(
    { _id: id },
    "username",
    (err, user) => {
      console.log("---Deserialize user, user: ");
      console.log(user);
      console.log("---------");
      done(null, user);
    }
  )
})

passport.use(localStrategy);

module.exports = passport
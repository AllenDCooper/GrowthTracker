const express = require("express");
// require express-session to establish session connection
const session = require("express-session");
// require random string session to create random session secret
const randomString = require("randomstring");
// require passport to save user object into session object (req.session) created by express-session
const passport = require("passport")
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes)

// add middleware path for session
app.use(
  session({
    secret: randomString.generate(),
    resave: false,
    saveUnitialized: false
  })
);

// initiatlize passport
// this code runs serializeUser from passport library which adds user id in the req.session.passport.user object
app.use(passport.initialize());
// this code reuns deserializeUser from the passport library which checks to see if user is saved in the database, and if so, assigns the user object to req.user
app.use(passport.session());


// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/GTexamples_database");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

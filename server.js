require("dotenv").config();
const express = require("express");
// Require express-session to establish session connection.
const session = require("express-session");
// Require random string session to create random session secret.
const randomString = require("randomstring");
// Require passport to save user object into session object (req.session) created by express-session.
const passport = require("./passport");
// Require connect-mongo to save session in the database.
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets.
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add middleware path for session.
app.use(
  session({
    secret: randomString.generate(),
    store: new MongoStore({ url: process.env.MONGODB_URI || "mongodb://localhost/GTexamples_database" }),
    resave: false,
    saveUnitialized: false
  })
);

// Initiatlize passport.
// This code runs serializeUser from passport library which adds user id in the req.session.passport.user object.
app.use(passport.initialize());
// This code reuns deserializeUser from the passport library which checks to see if user is saved in the database, and if so, assigns the user object to req.user.
app.use(passport.session());

// Add routes, both API and view.
app.use(routes)

// Connect to the Mongo DB.
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/GTexamples_database");

// Start the API server.
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

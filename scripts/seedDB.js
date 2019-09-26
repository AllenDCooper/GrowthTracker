const mongoose = require("mongoose");
const db = require("../models");
const surveySeeds = require("./surveys.json")

// This file empties the Examples collection and inserts the examples below.

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/GTexamples_database"
);

db.Survey
  .remove({})
  .then(() => db.Survey.collection.insertMany(surveySeeds))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });


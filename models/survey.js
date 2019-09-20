const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const surveySchema = new Schema({
  name: { type: String, unique: false, required: true },
  description: { type: String, unique: false, required: false },
  items: [],
  rawScores: []
})

const Survey = mongoose.model("Survey", surveySchema);

module.exports = Survey;
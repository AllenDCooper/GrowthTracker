const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scoreSchema = new Schema({
  rawScoreSeries: [],
  totalRawScore: { type: Number },
  surveyID: [
    {
    type: Schema.Types.ObjectId,
    ref: "Survey"
    }
  ],
  userID: [
    {
    type: Schema.Types.ObjectId,
    ref: "User"
    }
  ],
  date: { type: Date, default: Date.now }
});

const Score = mongoose.model("Score", scoreSchema);

module.exports = Score;
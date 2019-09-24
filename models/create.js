const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const createSchema = new Schema({
  name: { type: String, unique: false, required: true },
  description: { type: String, unique: false, required: false },
  questions: [],
})

const Create = mongoose.model("Create", createSchema);

module.exports = Create;
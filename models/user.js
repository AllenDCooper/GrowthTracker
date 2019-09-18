const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs")
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: false, required: false },
  password: { type: String, unique: false, required: false },
  firstName: { type: String },
  lastName: { type: String },
  organization: { type: String },
  savedSurveys: [
    {
    type: Schema.Types.ObjectId,
    ref: "Survey"
    }
  ]
});

// add methods to userSchema to hash password
userSchema.methods = {
  // function that checks to see if password stored in session matches that stores in the user document
  checkPassword: function(inputPassword) {
    return bcryptjs.compareSync(inputPassword, this.password)
  },
  // function that changes plain text password to a hashed password, with a salt number of 10, using bcryptjs 
  hashPassword: plainTextPassword => {
    return bcryptjs.hashSync(plainTextPassword, 10)
  }
}

// add pre-hook on save method for the user schema so that Mongoose will hash the password before saving it to MongoDB
userSchema.pre("save", function(next) {
  if(!this.password) {
    console.log("models/user.js -------NO PASSWORD PROVIDED-------")
    next()
  } else {
    console.log("models/user.js hashPassword is pre save");
    // the password entered is hashed and then saved as this password on the user document in the MongoDB
    this.password = this.hashPassword(this.password)
    next()
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
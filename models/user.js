const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 6;

const userSchema = new mongoose.Schema({
  username: {type: String, required: true, lowercase: true, unique: true},
  firstName: String,
  lastName: String,
  email: {type: String, required: true, lowercase: true, unique: true},
  password: {
    type: String,
    select: false
  },
  avatar: String,
  location: String,
  // following: Reference to users
}, {
  timestamps: true
});

userSchema.methods.comparePassword = function(tryPassword, cb) {
  bcrypt.compare(tryPassword, this.password, cb);
};

userSchema.set('toJSON', {
  transform: function(doc, ret) {
    // remove the password property when serializing doc to JSON
    delete ret.password;
    return ret;
  }
});

// hook into schema middleware
userSchema.pre("save", function(next) {
  const user = this;
  console.log("save middleware");
  if (!user.isModified("password")) return next();
  // hash password
  bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
    if (err) return err;
    // replace provided pass with hash
    user.password = hash;
    next();
  });
});

module.exports = mongoose.model('User', userSchema);

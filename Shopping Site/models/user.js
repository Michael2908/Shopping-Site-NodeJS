const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

var userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});
userSchema.method("encryptPassword", function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
});

userSchema.method("validPassword", function (password) {
  return bcrypt.compareSync(password, this.password);
});

module.exports = mongoose.model("User", userSchema);

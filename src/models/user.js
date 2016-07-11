//USER MODEL
var mongoose = require('mongoose');

//Constructor function
var UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

module.exports = mongoose.model('User', UserSchema);

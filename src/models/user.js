//USER MODEL
var mongoose = require('mongoose');
////////
//Constructor function
var UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  location: String,
  bdaymonth: Date,
  gender: String
});
/////////
module.exports = mongoose.model('User', UserSchema);

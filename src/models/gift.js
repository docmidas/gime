//GIFT MODEL
var mongoose = require('mongoose');

//Constructor function
var GiftSchema = new mongoose.Schema({
  name: String,
  category: String,
  imgUrl: String,
  description: String,
  gimeStatus: Boolean,
  price: Number

});

module.exports = mongoose.model('Gift', GiftSchema);

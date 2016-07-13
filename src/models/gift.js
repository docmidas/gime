//GIFT MODEL
var mongoose = require('mongoose');

//Constructor function
var GiftSchema = new mongoose.Schema({
  userId: String,
  name: String,
  category: String,
  imgUrl: String,
  description: String,
  gimeStatus: String,
  price: Number
  //privacy: Boolean

});

module.exports = mongoose.model('Gift', GiftSchema);

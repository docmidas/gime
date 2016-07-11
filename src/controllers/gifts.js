var express   = require('express'),
    Gifts  = express.Router(),
    fs        = require('fs'),
    mongoose  = require('mongoose'),
    Gift   = require('../models/gift');

 var testGifts = [{name: "freddy nikes",
                      category: "clothes",
                      imgUrl: "http://theshoegame.com/wp-content/uploads/2012/02/Air-Jordan-VI6-Freddy-Kruger-Customs-04.jpg",
                      description: "want these for Halloween. size 10",
                      price: 250
                    },
                    {name: "kids tablet",
                      category: "computer",
                      imgUrl: "https://images-na.ssl-images-amazon.com/images/I/71ePnCmB%2BkL._SL1000_.jpg",
                      description: "1 blue and 1 pink... maybe",
                      price: 100
                    }];   

 //Mongoose
 Gifts.route('/:id/?')
  .get(function(req, res, next) {
    res.json({
        message: "you asked for " + req.params.id});
  })
  .patch(function(req, res, next) {
    var id = req.params.id;
    Gift.findByIdAndUpdate(id, { username: "jaxx", password: "ffp", email: "gotcha@mk.com"}, function (err, task) {
  console.log(task);
});
    res.json({message: "Updated todo at " + req.params.id});
  })
  .delete(function(req, res, next) {
    var id = req.params.id;
    Gift.findByIdAndRemove(id, function(err, task) {
        console.log("Deleted:");
        console.log(task);
      });
    res.json({message: "Deleted entry at " + req.params.id});
  })

Gifts.route('/?')
  .get(function(req, res) {
    Gift.find(function(err, users) { //first thing is Error and second thing is all users within user database
      console.log(users);  
      //console.log(err);
      res.json(users);
      //res.render('form');
    })
  })
  .post(function(req, res) {
    // User.create(req.body, function(err, users) {
    Gift.create(testGifts, function(err, users) {
      console.log(users);
      res.json(users);
    });
  });  

module.exports = Gifts;

//Profiles Controller
var express   = require('express'),
    Profiles  = express.Router(),
    fs        = require('fs'),
    mongoose  = require('mongoose'),
    Gift   = require('../models/gift');

 var testGifts = [];   
/////home/membersonly/profile/
 Gifts.route('/myprofile/?')
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





/////////////////////////////////
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
    Gift.find(function(err, gifts) { //first thing is Error and second thing is all gifts within user database
      console.log(gifts);  
      //console.log(err);
      //res.json(gifts);
      res.render('profile', {gift: gifts});
      //res.render('form');
    })
  })
  /////FOR TESTING to Load ALL Test Items
  .post(function(req, res) {
    // User.create(req.body, function(err, gifts) {
    Gift.create(testGifts, function(err, gifts) {
      console.log(gifts);
      res.json(gifts);
    });
  });  
  /////////

module.exports = Profiles;

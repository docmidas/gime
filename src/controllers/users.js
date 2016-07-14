var express   = require('express'),
    Users  = express.Router(),
    fs        = require('fs'),
    mongoose  = require('mongoose'),
    User   = require('../models/user'),
    Gift        = require(__dirname + '/../models/gift');

 var roster = []; 

//SUCCESFUL LOGIN OR SIGN UP LEADS HERE
 Users.route('/myprofile/?')
  .get(function(req, res, next) {
    //console.log(req.body);   
    var usersGifts = []; 
    console.log("My req.session.userId:" + req.session.userId);
    Gift.find({userId: req.session.userId}, function(error, giftList) {     
      for(var gi = 0; gi < giftList.length; gi++) {
        
          usersGifts.push(giftList[gi]);
         
      };
      console.log("usersGifts is defined as" + usersGifts);
    })
    // setTimeout(function() { 
    //   res.render('profile', {gift: usersGifts });
    // }, 6000);
    res.render('profile', {gift: usersGifts });

  })
  .patch(function(req, res, next) {
    var id = req.params.id;
    User.findByIdAndUpdate(id, { username: "jaxx", password: "ffp", email: "gotcha@mk.com"}, function (err, task) {
      console.log(task);
    });
    res.json({message: "Updated todo at " + req.params.id});
  })
  .delete(function(req, res, next) {
    var id = req.params.id;
    User.findByIdAndRemove(id, function(err, task) {
        console.log("Deleted:");
        console.log(task);
      });
    res.json({message: "Deleted entry at " + req.params.id});
  });


 //Mongoose
 Users.route('/:id/?')
  .get(function(req, res, next) {
    res.json({
        message: "you asked for " + req.params.id});
  })
  .patch(function(req, res, next) {
    var id = req.params.id;
    User.findByIdAndUpdate(id, { username: "jaxx", password: "ffp", email: "gotcha@mk.com"}, function (err, task) {
      console.log(task);
    });
    res.json({message: "Updated todo at " + req.params.id});
  })
  .delete(function(req, res, next) {
    var id = req.params.id;
    User.findByIdAndRemove(id, function(err, task) {
        console.log("Deleted:");
        console.log(task);
      });
    res.json({message: "Deleted entry at " + req.params.id});
  })

Users.route('/?')
  .get(function(req, res) {
    User.find(function(err, users) { //first thing is Error and second thing is all users within user database
      console.log(users);  
      //console.log(err);
      //res.json(users); 
      res.render('users', {user: users});     
    })
  })
  .post(function(req, res) {
    // User.create(req.body, function(err, users) {
    User.create(roster, function(err, users) {
      console.log(users);
      res.json(users);
    });
  });  

module.exports = Users;

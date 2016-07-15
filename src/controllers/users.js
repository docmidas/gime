var express   = require('express'),
    Users  = express.Router(),
    fs        = require('fs'),
    mongoose  = require('mongoose'),
    User   = require('../models/user'),
    Gift        = require(__dirname + '/../models/gift');
///////////
////SUCCESFUL LOGIN OR SIGN UP LEADS HERE
 Users.route('/myprofile/?')
  .get(function(req, res, next) {
    //console.log(req.body);   
    var usersGifts = []; 
    console.log("My req.session.userId:" + req.session.userId);
    Gift.find({userId: req.session.userId}, function(error, giftList) {     
      for(var gi = 0; gi < giftList.length; gi++) {        
          usersGifts.push(giftList[gi]);         
      };
    })
    // setTimeout(function() { 
    //   res.render('profile', {gift: usersGifts });
    // }, 6000);
    res.render('profile', {gift: usersGifts, isLoggedIn: req.session.isLoggedIn ? true : false });
  })
/////Keeping for later. Will allow for removing items off gift list
///
  // .delete(function(req, res, next) {
  //   var id = req.params.id;
  //   User.findByIdAndRemove(id, function(err, task) {
  //       console.log("Deleted:");
  //       console.log(task);
  //     });
  //   res.json({message: "Deleted entry at " + req.params.id});
  // });
//////////// End of KEEP FOR LATER
////!!!!NEW==Route: root/membersonly/users/:id
 Users.route('/:username/?')
  .get(function(req, res, next) {
    var reqUsername = req.params.username;
    User.findOne({username: reqUsername}, function(error, user) {
      if (!user) {
        res.json({message: reqUsername + " does not exist"});
      } else {
        //res.json({message: reqUsername + " EXISTS!!!!"});
        var reqUserId = user._id;
        ///
          Gift.find(function(err, giftList) {
              var usersGifts = [];
              for(var gi = 0; gi < giftList.length; gi++) {
                if(giftList[gi].userId == reqUserId) {
                  usersGifts.push(giftList[gi]);                    
                }
              }
              res.render('othersprofile', {username: reqUsername, gift: usersGifts, isLoggedIn: req.session.isLoggedIn ? true : false});  
            }
          );
      }
    });
  })
  ////////////DELETE by USERNAME. For admin purposes.
///////DEX change user id to username below in this DELTE method.
  .delete(function(req, res, next) {
    var id = req.params.id;
    User.findByIdAndRemove(id, function(err, task) {
        console.log("Deleted:");
        console.log(task);
      });
    res.json({message: "Deleted entry at " + req.params.id});
  })
/////////////////////
////==Route: root/membersonly/users
Users.route('/?')
  .get(function(req, res) {
    User.find(function(err, users) { //first thing is Error and second thing is all users within user database
      console.log(users);  
      //console.log(err);
      //res.json(users); 
      res.render('users', {user: users, isLoggedIn: req.session.isLoggedIn ? true : false});     
    })
  });
module.exports = Users;

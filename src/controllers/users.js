var express   = require('express'),
    Users  = express.Router(),
    fs        = require('fs'),
    mongoose  = require('mongoose'),
    User   = require('../models/user');

 var roster = [{username: "kitana",
                      password: "dbp",
                      email: "fanmail@mk.com"
                    },
                    {username: "baraka",
                      password: "bbbp",
                      email: "blades@mk.com"
                    }];   

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
      res.json(users);      
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

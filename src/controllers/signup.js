// SIGNUPController
// ==============
// Controller for the homepage.

var express         = require('express'),
    SignupController  = express.Router(),
    User            = require(__dirname + '/../models/user'),
    bcrypt          = require('bcrypt'),
    fs        = require('fs'),
    mongoose  = require('mongoose');





// SignupController.route('/usersonly/?')
//   // GET /usersonly/
//   // ---------------
//   // The page you see after registration
//   .get(function(req, res, next) {
//     res.send('Users only page!');
//   });


SignupController.route('/?')
  // GET /
  // -----
  // Serve the homepage
  .get(function(req, res, next) {
    res.render('signup', {});
  })
  // POST /
  // ------
  // Register a new user
  .post(function(req, res, next) {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
      // Save user inside here
      User.create({
        username: req.body.username,
        password: hash,
        email: req.body.email,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        location: req.bodylocation,
        bdaymonth: req.body.bdaymonth,
        gender: req.body.gender

      }, function(err, user) {
        if (err) {
          console.log(err);
          res.render('home', {error: err});
        } else {
          res.redirect('users'); //should be usersonly
        }
      });
    });
  });

module.exports = SignupController;






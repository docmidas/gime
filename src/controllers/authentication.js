//Require dependencies
var express                 = require('express'),
  AuthenticationController  = express.Router(),
  User                      = require(__dirname + "/../models/user");

  //Route
  //GET
  // Render the registration page
  .get(function(req, res, next) {
    res.render('register', {
      pageTitle: 'Register for an account | Sign up',
      message:   req.session.isLoggedIn ? 'You are already logged in' : 'You need to sign up'
    });
  })
  // POST /
  // ------
  // Registers a new user
  .post(function(req, res, next) {
    if (req.body.password === req.body.password_confirmation) {
      User.create({
        username: req.body.username,
        password: req.body.password
      }, function(err, user) {
        if (err) {
          res.send('ERROR! ' + err);
        } else {
          req.session.isLoggedIn  = true;
          req.session.userId      = user._id;
          res.redirect('/membersonly');
        }
      });
    }
  });

module.exports = AuthenticationController;

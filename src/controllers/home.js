// HomeController
// ==============
// Controller for the homepage.

var express         = require('express'),
    HomeController  = express.Router(),
    User            = require(__dirname + '/../models/user'),
    bcrypt          = require('bcrypt');


HomeController.route('/usersonly/?')
// GET /usersonly/
// The page you see after registration
  .get(function(req, res, next) {
    res.render('signup', {});
  });


HomeController.route('/?')
  // GET /
  // Serve the homepage
  .get(function(req, res, next) {
    res.render('login', {});
  })
  // POST /
  // ------
  // Login User
  .post(function(req, res, next) {
    User.findOne({username: req.body.username}, function(error, user) {
      if (error || !user) {
        res.send('Could not find user');
      } else {
        bcrypt.compare(req.body.password, user.password, function(err, result) {
          if (err) {
            res.send('ERROR: ' + err);
          } else if (result) {
            res.redirect('/users');
          } else {
            res.send('Wrong password!')
          }
        })
      }
    })
  });

module.exports = HomeController;

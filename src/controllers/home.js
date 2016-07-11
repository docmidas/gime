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
    res.send('Users only page!');
  });


HomeController.route('/?')
  // GET /
  // Serve the homepage
  .get(function(req, res, next) {
    res.render('home', {});
  })
  // POST /
  // ------
  // Register a new user
  .post(function(req, res, next) {
    bcrypt.hash(req.body.password, 10, function(err, hash) {
      // Save user inside here
      User.create({
        username: req.body.username,
        password: hash
      }, function(err, user) {
        if (err) {
          console.log(err);
          res.render('home', {error: err});
        } else {
          res.redirect('/usersonly');
        }
      });
    });
  });

module.exports = HomeController;

// HomeController
// ==============
// Controller for the homepage.

var express         = require('express'),
    HomeController  = express.Router(),
    User            = require(__dirname + '/../models/user'),
    bcrypt          = require('bcrypt'),
    Gift            = require(__dirname + '/../models/gift');


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
            // res.redirect('/users');
            //res.redirect('/profile', {userId: req.body._id});
            User.findById(user._id, function (err, task) {
              console.log(user._id + "  " + user.firstName);
              console.log("==================");
              Gift.find(function(err, giftList) {
                var usersGifts = [];
                for(var gi = 0; gi < giftList.length; gi++) {
                  if(giftList[gi].userId == user._id) {
                    usersGifts.push(giftList[gi]);                    
                  }
                }
                console.log(usersGifts);
                res.render('profile', {username: user.username, gift: usersGifts});  
              });
            });
//////////
            //res.redirect('/profile', {userId: user._id});            
          } else {
            res.send('Wrong password!')
          }
        })
      }
    })
  });



module.exports = HomeController;

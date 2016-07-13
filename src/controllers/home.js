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
  /////////==========================
HomeController.route('/signup/?')
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
  ////DEX, ensure unique username and email here!!!!!
  var unique = true;
  var message = "";
  var usernameCheck = false;
  var emailCheck = false;
  console.log("THIS IS THE ATTEMPTED UN: " + req.body.username);
  console.log("THIS IS THE ATTEMPTED EMAIL: " + req.body.email);

  
  User.findOne({username: req.body.username}, function(error, username) {
      if (username) {
        console.log('if happeneddddddddd')
        unique = false;
        message = "Please retry: USERNAME is already taken";
      }
    });
  User.findOne({email: req.body.email}, function(error, email) {
      if (email) {
        unique = false;
        message = "Please try LOGGING IN. This email is already registered"
      }
    });
  console.log("THIS IS THE UNIQUE VAL before unique check: " + unique);
//
  setTimeout(function() {  
  if(unique === false){
    console.log(message);
    res.render('signup', {message: message}); 
  }else{
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
        req.session.isLoggedIn  = true;
        req.session.userId      = user._id;
        res.redirect('/membersonly/users/myprofile');      
      }
    });
  });
  }//end of unique check
}, 6000);

});
////////=======================
HomeController.route('/?')
  // GET /
  // Serve the homepage and LOGIN Prompt
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
              ///GRAB GIFT ENTRIES ASSOCIATED WITH THIS USER ONLY
              Gift.find(function(err, giftList) {
                var usersGifts = [];
                for(var gi = 0; gi < giftList.length; gi++) {
                  if(giftList[gi].userId == user._id) {
                    usersGifts.push(giftList[gi]);                    
                  }
                }
                //console.log(usersGifts); // TEST LINE TO CHECK USER's Giftlist
                req.session.isLoggedIn  = true;
                req.session.userId      = user._id;
                console.log("isLoggedIn:" + req.session.isLoggedIn + " UserId:" +  req.session.userId );
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

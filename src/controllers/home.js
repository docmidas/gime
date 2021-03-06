// HomeController
// ==============
// Controller for the homepage.

var express         = require('express'),
    HomeController  = express.Router(),
    User            = require(__dirname + '/../models/user'),
    bcrypt          = require('bcrypt'),
    Gift            = require(__dirname + '/../models/gift');
////////
/////////==========================
HomeController.route('/signup/?')
// GET /
// -----
// Serve the homepage
.get(function(req, res, next) {
  res.render('signup', {isLoggedIn: req.session.isLoggedIn ? true : false});
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
  req.body.username = req.body.username.toLowerCase();
  req.body.email = req.body.email.toLowerCase();
  // console.log("THIS IS THE ATTEMPTED UN: " + req.body.username);
  // console.log("THIS IS THE ATTEMPTED EMAIL: " + req.body.email);  
  User.findOne({username: req.body.username}, function(error, username) {
      if (username || req.body.username == "myprofile") { //prevents trolls from ruining myprofile page
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
  //console.log("THIS IS THE UNIQUE VAL before unique check: " + unique);
//
  setTimeout(function() {  
  if(unique === false){
    //console.log(message);
    res.render('signup', {message: message, isLoggedIn: req.session.isLoggedIn ? true : false}); 
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
        res.render('home', {error: err, isLoggedIn: req.session.isLoggedIn ? true : false});
      } else {
        req.session.isLoggedIn  = true;
        req.session.userId      = user._id;
        //console.log("Session USER ID HAS BEEN SET: " + req.session.userId );
        res.redirect('/membersonly/users/myprofile');      
      }
    });
  });
  }//end of unique check
}, 6000);
});
////////=======================
////SIGN OUT!!!//
HomeController.route("/signout/?")
  .get(function(req, res, next) {
    req.session.isLoggedIn  = false;
    req.session.userId      = null;
    //console.log("SIGNED OUT /n req.session.userId: " + req.session.userId + "/n req.session.isLoggedIn: " + req.session.isLoggedIn);
    res.redirect("/");
  });
////
////////=======================
HomeController.route('/?')
  // GET /
  // Serve the homepage and LOGIN Prompt
  .get(function(req, res, next) {
    res.render('login', {
      isLoggedIn: req.session.isLoggedIn ? true : false
    });
  })
  // POST /
  // ------
  // Login User
  .post(function(req, res, next) {
    req.body.username = req.body.username.toLowerCase();
    User.findOne({username: req.body.username}, function(error, user) {
      if (error || !user) {
        res.send('Could not find user');
      } else {
        bcrypt.compare(req.body.password, user.password, function(err, result) {
          if (err) {
            res.send('ERROR: ' + err);
          } else if (result) {
            req.session.isLoggedIn  = true;
            req.session.userId      = user._id;
            res.redirect('/membersonly/users/myprofile');        
          } else {
            res.render('login', {message: "Wrong Password", isLoggedIn: req.session.isLoggedIn ? true : false});
          }
        })
      }
    })
  });
//////
module.exports = HomeController;

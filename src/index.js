//MAIN SERVER FILE
require('dotenv').config({silent: true});
var express     = require('express'),
    app         = express(),
    exphbs      = require('express-handlebars'),
    fs          = require('fs'),
    bodyParser  = require('body-parser'),
    session     = require('express-session');
/////////////////
////==SET VIEW ENGINE
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  partialsDir: __dirname + '/views/partials/',
  layoutsDir: __dirname + '/views/layouts/',
  extname: '.hbs'
}));
app.set('view engine', 'hbs'); //initiate view engine
app.set('views', __dirname + '/views'); //Set view directory
app.use(bodyParser.urlencoded({extended:true})); //prep body responses from DB
app.use(express.static(__dirname + '/public')); ///stactic elements directory
//////SESSION CONFIGURATION
app.use(session({
  name: 'sessionclass',
  resave: false,
  saveUninitialized: false,
  secret: 'xw4gfqgV89qjarqDzF8pCje9'
}));
//////////////////////////
////==Connect database
require('./config/db');
///////////////////
////==Mount Middleware
app.use('/membersonly/?', function(req, res, next) {
  if (req.session.isLoggedIn === true) {
    next();
  } else {
    //res.redirect('/');
    var message = "Please LOG IN to use this feature";
    res.render('login', {message: message});
  }
});
app.use('/membersonly/users/?', require('./controllers/users'));
app.use('/membersonly/gifts/?', require('./controllers/gifts'));
app.use(require('./controllers/home'));
////////////////
////==START SERVER 
var server = app.listen(process.env.PORT || 3000, function() {
  console.log("Server listening @: " + server.address().port);
});
/////


//MAIN SERVER FILE
var express     = require('express'),
    app         = express(),
    exphbs      = require('express-handlebars'),
    fs          = require('fs'),
    bodyParser  = require('body-parser'),
    session     = require('express-session');

//SET VIEW ENGINE
app.engine('hbs', exphbs({
  defaultLayout: 'main',
  partialsDir: __dirname + '/views/partials/',
  layoutsDir: __dirname + '/views/layouts/',
  extname: '.hbs'
})) /////ZZZ last semicolon go here?

app.set('view engine', 'hbs'); //initiate view engine
app.set('views', __dirname + '/views'); //Set view directory
app.use(bodyParser.urlencoded({extended:true})); //prep body 
app.use(express.static(__dirname + '/public'));

app.use(session({
  name: 'sessionclass',
  resave: false,
  saveUninitialized: false,
  secret: 'xw4gfqgV89qjarqDzF8pCje9'
}));
//
//
//Connect database
require('./config/db');
//
//Mount Middleware
app.use('/membersonly/users/?', require('./controllers/users'));
app.use('/membersonly/gifts/?', require('./controllers/gifts'));
//app.use('/signup/?', require('./controllers/signup'));
//app.use('/membersonly/profile/?', require('./controllers/profiles'));
app.use(require('./controllers/home'));
//==========|||
//==========||| SESSIONS
// app.use('/membersonly/?', function(req, res, next) {
//   if (req.session.isLoggedIn === true) {
//     next();
//   } else {
//     res.redirect('/');
//   }
// })
// app.use('/membersonly/?', function(req, res, next) { res.send('You are a member!') })
//app.use(require('./controllers/authentication'));
////////////////////



//START SERVER
var server = app.listen(3000, function() {
  console.log("Server listening @: " + server.address().port);
});


//MAIN SERVER FILE
var express     = require('express'),
    app         = express(),
    exphbs      = require('express-handlebars'),
    fs          = require('fs'),
    bodyParser  = require('body-parser');

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


//Connect database
require('./config/db');

//Mount Middleware
app.use('/users/?', require('./controllers/users'));
app.use('/gifts/?', require('./controllers/gifts'));
//app.use('//?', require('./controllers/'));
app.use('/signup/?', require('./controllers/signup'));
app.use('/profile/?', require('./controllers/profiles'));



app.use(require('./controllers/home'));



//START SERVER
var server = app.listen(3000, function() {
  console.log("Server listening @: " + server.address().port);
});


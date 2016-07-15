var mongoose = require('mongoose');
<<<<<<< HEAD
var connectionString = process.env.NODE_ENV === 'production' ? 'mongodb://<shawna>:<tamar88>@ds011705.mlab.com:11705/gime''mongodb://localhost/gimeUsers';
=======
//var connectionString = 'mongodb://localhost/gimeUsers';
var connectionString = process.env.DB_HOST || 'mongodb://localhost/gimeUsers';
>>>>>>> 1fdfb0cda57d0975cb7dbe84d563e18c08ffe10b

mongoose.connect(connectionString);

mongoose.connection.on("connected", function() {
  console.log("mongoose connected to: " + connectionString)
});

mongoose.connection.on("error", function(err) {
  console.log("mongoose failed to connect to: " + connectionString);
});

mongoose.connection.on("disconnected", function() {
  console.log("mongoose has been disconnected from: " + connectionString);
});

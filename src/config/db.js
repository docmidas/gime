var mongoose = require('mongoose');
var connectionString = process.env.NODE_ENV === 'production' ? 'mongodb://<shawna>:<tamar88>@ds011705.mlab.com:11705/gime''mongodb://localhost/gimeUsers';

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

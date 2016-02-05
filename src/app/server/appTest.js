/*
 * Main App file appTest.js
 */


// Dependencies requirements, Express 4
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require("mongoose");
var appTest            = express();
var path           = require('path');


appTest.use(morgan('dev')); 					// log every request to the console
appTest.use(bodyParser()); 						// pull information from html in POST
appTest.use(methodOverride()); 					// simulate DELETE and PUT

//Add the routes
routes = require('./routes/routeManager')(appTest);


// MongoDB configuration
mongoose.connect('mongodb://localhost/MultiTrackDB_Test', function(err, res) {
  if(err) {
    console.log('Error connecting to MongoDB_Test Database. ' + err);
  } else {
    console.log('Connected to Database MultiTrackDB_Test');
  }
});

appTest.listen(3000);


console.log('Magic happens on port 3000'); 






/*
 * Main App file App.js
 */


// Dependencies requirements, Express 4
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require("mongoose");
var app            = express();

app.use(express.static('../client')); 	// set the static files location
app.use(morgan('dev')); 					// log every request to the console
app.use(bodyParser()); 						// pull information from html in POST
app.use(methodOverride()); 					// simulate DELETE and PUT

//Add the routes
routes = require('./routes/routeManager')(app);


// MongoDB configuration
mongoose.connect('mongodb://localhost/MutliTrackDB', function(err, res) {
  if(err) {
    console.log('Error connecting to MongoDB Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});

app.listen(8080);
//<<<<<<< HEAD
console.log('Magic happens on port 8080'); 			// shoutout to the user
/**
First example router
app.get('/', function(req, res) {
  res.send("Welcome to our application !");
});**/

console.log('Magic happens on port 8080'); 

// First example router
app.get('/', function(req, res) {
 
  res.sendFile("index.html");
});

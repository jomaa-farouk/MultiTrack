/*
 * Main App file app.js
 */


// Dependencies requirements, Express 4
var express        = require('express');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var mongoose       = require("mongoose");
var app            = express();
var path           = require('path');

app.use(express.static('../client')); 	// set the static files location
app.use(morgan('dev')); 					// log every request to the console
app.use(bodyParser()); 						// pull information from html in POST
app.use(methodOverride()); 					// simulate DELETE and PUT

//Add the routes
routes = require('./routes/routeManager')(app);


// MongoDB configuration
mongoose.connect('mongodb://localhost/MultiTrackDB', function(err, res) {
  if(err) {
    console.log('Error connecting to MongoDB Database. ' + err);
  } else {
    console.log('Connected to Database MultiTrackDB');
  }
});

app.listen(8080);


console.log('Magic happens on port 8080'); 


// First example router
app.get('/', function(req, res) {
 
  res.sendFile("index.html");
});


app.get('/track/:directory/sound/:file', function(req, res) {

  var myPath = path.resolve(__dirname, '..', '..', '..' , 'resource' , 'multitrack', req.params.directory , req.params.file);
  res.sendfile(myPath);

});


app.get('/impulse/:impulseName', function(req, res) {

  var myPath = path.resolve(__dirname, '..', '..', '..' , 'resource' , 'impulses', req.params.impulseName );
  res.sendfile(myPath);

});




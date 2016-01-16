/**
 * Rating
 *
 * @module      :: Model
 * @description :: Represent data model for the Ratings
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/MutliTrackDB");
autoIncrement.initialize(connection);


var Rating = new Schema({

  username:    {
    type    : String,
    require : true
  },
  mixName:     {
    type    : String,
    require : true
  },
  mark:     {
    type    : String,
    require : true
  },
  dateOfCreation: {
    type    : Date,
    default : Date.now
  }
});

Rating.plugin(autoIncrement.plugin, 'Rating');
module.exports = mongoose.model('Rating', Rating);
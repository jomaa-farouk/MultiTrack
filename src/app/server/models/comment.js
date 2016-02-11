/**
 * Comment
 *
 * @module      :: Model
 * @description :: Represent data model for the Comments
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/MultiTrackDB");
autoIncrement.initialize(connection);


var Comment = new Schema({

  username:    {
    type    : String,
    require : true
  },
  trackName:    {
    type    : String,
    require : true
  },
  content:     {
    type    : String,
    require : true
  },
  mixName:     {
    type    : String,
    require : true
  },
  dateOfCreation: {
    type    : Date,
    default : Date.now
  }
});

Comment.plugin(autoIncrement.plugin, 'Comment');
module.exports = mongoose.model('Comment', Comment);
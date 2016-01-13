/**
 * Comment
 *
 * @module      :: Model
 * @description :: Represent data model for the Comments
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Comment = new Schema({

  username:    {
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

module.exports = mongoose.model('Comment', Comment);
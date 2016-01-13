/**
 * Rating
 *
 * @module      :: Model
 * @description :: Represent data model for the Ratings
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


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

module.exports = mongoose.model('Rating', Rating);
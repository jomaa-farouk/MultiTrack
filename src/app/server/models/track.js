/**
 * Track
 *
 * @module      :: Model
 * @description :: Represent data model for the Tarcks
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/MutliTrackDB");
autoIncrement.initialize(connection);


var Track = new Schema({

  trackName:    {
    type    : String,
    require : true,
    unique : true
  },
  piste: {
    type: Array
  },
  singer: {
    type    : String,
    require : true
  },
  album:   {
    type: String,
	  require : true
  },
  type:   {
    type: String,
    require : true
  },
  description:   {
    type: String,
    require : true
  },
  dateOfTrack: {
    type: Date
  }
});



Track.plugin(autoIncrement.plugin, 'Track');
module.exports = mongoose.model('Track', Track);
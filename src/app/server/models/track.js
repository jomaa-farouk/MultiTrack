/**
 * Track
 *
 * @module      :: Model
 * @description :: Represent data model for the Tarcks
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Track = new Schema({

  trackName:    {
    type    : String,
    require : true
  },
  pisteGuitar: {
      type: String
  },
  pisteSong: {
      type: String
  },
  singer:     {
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
  }
});

module.exports = mongoose.model('Track', Track);
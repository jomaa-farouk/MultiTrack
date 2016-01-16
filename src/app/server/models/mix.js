/**
 * Mix
 *
 * @module      :: Model
 * @description :: Represent data model for the Users
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/MutliTrackDB");
autoIncrement.initialize(connection);


var Mix = new Schema({

  username:    {
    type    : String,
    require : true
  },
  mixName:    {
    type    : String,
    require : true
  },
  description:     {
    type    : String,
    require : true
  },
  frequencies:   {
    type: Array
  },
  gain:   {
    type: Array
  },
  balance:   {
    type: Array
  },
  compressor:   {
    type: Array
  },
  dateOfCreation: {
    type    : Date,
    default : Date.now
  }
});


Mix.plugin(autoIncrement.plugin, 'Mix');
module.exports = mongoose.model('Mix', Mix);


/**
 * User
 *
 * @module      :: Model
 * @description :: Represent data model for the Users
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/MutliTrackDB");
autoIncrement.initialize(connection);


var User = new Schema({

  username:    {
    type    : String,
    require : true,
    unique : true
  },
  fullname:    {
    type    : String,
    require : true
  },
  mail:     {
    type    : String,
    require : true
  },
  passwd:   {
    type: String,
	  require : true
  },
  role: {
    type: String, // "Admin" or "simpleUser"
    require: true
  }
});

User.plugin(autoIncrement.plugin, 'User');
module.exports = mongoose.model('User', User);


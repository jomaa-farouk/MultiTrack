/**
 * User
 *
 * @module      :: Model
 * @description :: Represent data model for the Users
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var User = new Schema({

  username:    {
    type    : String,
    require : true
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
  }
});

module.exports = mongoose.model('User', User);
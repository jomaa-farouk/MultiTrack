var User = require('./models/user.js');
var Comment = require('./models/comment.js');
var Track = require('./models/track.js');
var Rating = require('./models/rating.js');
var Mix = require('./models/mix.js');
var superagent= require ('superagent');
var expect= require('expect.js');
var mongoose= require("mongoose");





describe ('Express rest api server',function(){



//Drop Database MultiTrackDB
it('Drop MultiTrackDB', function(done){ 
  superagent.get('http://localhost:8080/users')
   .end(function(e,res){
      console.log(res.body)
      expect(e).to.eql(null)
      expect(res.body.length).to.above(0)
      mongoose.connect('mongodb://localhost/MultiTrackDB', function(err, res) {
      mongoose.connection.db.dropDatabase();  
      });
    done()
    })
})


//Connect to Database
it('Connect to MultiTrackDB', function(done){  
    if (mongoose.connection.db) return done();
    mongoose.connect('mongodb://localhost/MultiTrackDB', done);
});




/***********************************************    INSERT THE ADMIN USER IN MultiTrackDB  *********************************/




var user = new User({
      username:    'admin',
      fullname:    'admin',
      mail:        'admin@admin.com',
      passwd:      '21232f297a57a5a743894a0e4a801fc3',
      role: 'admin'
    }); 

it('Post user', function(done){  
 superagent.post('http://localhost:8080/users')
  .send (user)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})


})

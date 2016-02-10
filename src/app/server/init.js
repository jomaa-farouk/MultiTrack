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

var track1 = new Track({trackName:"Michael jackson - Beat It",piste:'[{"pisteMp3":"basse.mp3"},{"pisteMp3":"batterie.mp3"},{"pisteMp3":"guitare.mp3"},{"pisteMp3":"synthes.mp3"},{"pisteMp3":"voix.mp3"}]',singer:"Micheal Jackson",album:"Thriller",type:"Pop",description:"Song of Micheal Jackson",dateOfTrack:"1983-02-14T13:28:06.419Z"}); 
var track2= new Track({trackName:"Metallica - One",piste:'[{"pisteMp3":"guitar.mp3"},{"pisteMp3":"rhythm.mp3"},{"pisteMp3":"song.mp3"}]',singer:"Metallica",album:"...And Justice for All",type:"Pop",description:"Song of Micheal Jackson",dateOfTrack:"1989-01-10T13:28:06.419Z"}); 
var track3= new Track({trackName:"Metallica - Enter Sandman (9 Trcks)",piste:'[{"pisteMp3":"Bass.mp3"},{"pisteMp3":"Drums 1.mp3"},{"pisteMp3":"Drums 2.mp3"},{"pisteMp3":"Drums 3.mp3"},{"pisteMp3":"Drums 4.mp3"},{"pisteMp3":"Guitar 1.mp3"},{"pisteMp3":"Guitar 2.mp3"},{"pisteMp3":"Vocal 2 + extras.mp3"},{"pisteMp3":"Vocal.mp3"}]',singer:"Metallica",album:"Thriller",type:"Metal",description:"Song of Metallica",dateOfTrack:"1991-08-12T13:28:06.419Z"}); 




it('Post user', function(done){  
 superagent.post('http://localhost:8080/users')
  .send (user)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})




it('Post track', function(done){  
 superagent.post('http://localhost:8080/tracks')
  .send (track1)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})

it('Post track', function(done){  
 superagent.post('http://localhost:8080/tracks')
  .send (track2)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})

it('Post track', function(done){  
 superagent.post('http://localhost:8080/tracks')
  .send (track3)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})



})

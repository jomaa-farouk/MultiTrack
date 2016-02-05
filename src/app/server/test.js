var User = require('./models/user.js');
var Comment = require('./models/comment.js');
var Track = require('./models/track.js');
var Rating = require('./models/rating.js');
var Mix = require('./models/mix.js');
var superagent= require ('superagent');
var expect= require('expect.js');
var mongoose= require("mongoose");


/*************************   !!!!  THESE UNIT TESTS ARE EXECUTED IN ORDER  !!!!   *************************************/ 


describe ('Express rest api server',function(){
var id=0;



var user = new User({  username: 'John',fullname: 'John Lenon',mail: 'john@gmail.com',passwd: '123',role: 'simpleUser'}); 

var comment = new Comment({ username : "mongoUser",trackName:"Michael jackson - Beat It", content : "That's a good mix !" , mixName : "michael jackson beat it mix 1"}); 

var track = new Track({trackName:"Michael jackson - Beat It",piste:'[{pisteMp3:"bassee.mp3"},{pisteMp3:"batterie.mp3"},{pisteMp3:"guitare.mp3"},{pisteMp3:"synthes.mp3"},{pisteMp3:"voix.mp3"}]',singer:"Micheal Jackson",album:"Beat It",type:"Pop",description:"Song of Micheal Jackson",dateOfTrack:"1992-10-21T13:28:06.419Z"}); 

var rating = new Rating({ username : "mongoUser", mixName : "michael jackson beat it mix 1", trackName : "Michael jackson - Beat It", mark : "3.5" }); 

var mix = new Mix({username: "John", mixName: "MixPop1", trackName: "Micheal Jackson - Beat It",  description: "Mix Pop number 1", frequencies:'[{frequence:"[10,55,58,78,66,10]"},{frequence:"[14,75,28,18,86,100]"}]',gain:'[{gain:"150"},{gain:"175"},{gain:"102"}]',balance:'[{balance:"150"},{balance:"175"},{balance:"102"}]',compressor:"150",impulses:'[{impulse:"150"},{impulse:"175"},{impulse:"102"}]'});















/****************************************************************************************************************************/

/***********************************************    TEST FOR USER  ********************************************************/

/**************************************************************************************************************************/

//Connect to Database and insert user, comment, rating, track and mix to provide the "the same environment for unit tests"
it('Connect to MultiTrackDB_Test', function(done){  
    if (mongoose.connection.db) return done();
    mongoose.connect('mongodb://localhost/MultiTrackDB_Test', done);
});

it('Post user', function(done){ 
 superagent.post('http://localhost:3000/users')
  .send (user)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})

it('Post comment', function(done){  
 superagent.post('http://localhost:3000/comments')
  .send (comment)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})

it('Post track', function(done){  
 superagent.post('http://localhost:3000/tracks')
  .send (track)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})

it('Post rating', function(done){  
 superagent.post('http://localhost:3000/ratings')
  .send (rating)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})

it('Post mix', function(done){  
 superagent.post('http://localhost:3000/mixs')
  .send(mix)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})














// Retrieve the user with id=0 (The first stocked user)
it('Retrieve a user',function(done){
 superagent.get('http://localhost:3000/users/'+id)
   .end(function(e,res){
   	console.log(res.body)
   	expect(e).to.eql(null)
   	expect(typeof res.body).to.eql('object')
   	done()
   })
})


// Delete the user with id=1
it('Delete a user',function(done){
 superagent.del('http://localhost:3000/users/'+1)
   .end(function(e,res){
    done()
   })
})



// Updates the user with id=0 (The first stocked user)
it('Updates a user',function(done){
 superagent.put('http://localhost:3000/users/'+id)
    .end(function(e,res){
    done()
 })
})



it('Retrieve all users',function(done){
 superagent.get('http://localhost:3000/users')
   .end(function(e,res){
    console.log(res.body)
    expect(e).to.eql(null)
    expect(res.body.length).to.above(0)
    expect(res.body.map(function(item){return item._id}))
    done()
   })
})



//Drop Database MultiTrackDB_Test
it('Drop MultiTrackDB_Test', function(done){ 
  superagent.get('http://localhost:3000/users')
   .end(function(e,res){
      console.log(res.body)
      expect(e).to.eql(null)
      expect(res.body.length).to.above(0)
      mongoose.connect('mongodb://localhost/MultiTrackDB_Test', function(err, res) {
      mongoose.connection.db.dropDatabase();  
      });
    done()
    })
})












/**************************************************************************************************************************/

/***********************************************    TEST FOR COMMENT  *****************************************************/

/**************************************************************************************************************************/


//Connect to Database and insert user, comment, rating, track and mix to provide the "the same environment for unit tests"
it('Connect to MultiTrackDB_Test', function(done){  
    if (mongoose.connection.db) return done();
    mongoose.connect('mongodb://localhost/MultiTrackDB_Test', done);
});

it('Post user', function(done){ 
 superagent.post('http://localhost:3000/users')
  .send (user)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})

it('Post comment', function(done){  
 superagent.post('http://localhost:3000/comments')
  .send (comment)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})

it('Post track', function(done){  
 superagent.post('http://localhost:3000/tracks')
  .send (track)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})

it('Post rating', function(done){  
 superagent.post('http://localhost:3000/ratings')
  .send (rating)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})

it('Post mix', function(done){  
 superagent.post('http://localhost:3000/mixs')
  .send(mix)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})












// Retrieve the comment with id=0 (The first stocked comment)
it('Retrieve a comment',function(done){
 superagent.get('http://localhost:3000/comments/'+id)
   .end(function(e,res){
    console.log(res.body)
    expect(e).to.eql(null)
    expect(typeof res.body).to.eql('object')
    done()
   })
})



// Delete the comment with id=1
it('Delete a comment',function(done){
 superagent.del('http://localhost:3000/comments/'+1)
   .end(function(e,res){
    done()
   })
})




// Updates the comment with id=0 (The first stocked comment)
it('Updates a comment',function(done){
 superagent.put('http://localhost:3000/comments/'+id)
    .end(function(e,res){
    done()
 })
})



it('Retrieve all comments',function(done){
 superagent.get('http://localhost:3000/comments')
   .end(function(e,res){
    console.log(res.body)
    expect(e).to.eql(null)
    expect(res.body.length).to.above(0)
    expect(res.body.map(function(item){return item._id}))
    done()
   })
})


//Drop Database MultiTrackDB_Test
it('Drop Table MultiTrackDB_Test', function(done){ 
  superagent.get('http://localhost:3000/comments')
   .end(function(e,res){
      console.log(res.body)
      expect(e).to.eql(null)
      expect(res.body.length).to.above(0)
      mongoose.connect('mongodb://localhost/MultiTrackDB_Test', function(err, res) {
      mongoose.connection.db.dropDatabase();  
      });
    done()
    })
})















/*************************************************************************************************************************/

/***********************************************    TEST FOR RATING  *****************************************************/

/*************************************************************************************************************************/

//Connect to Database and insert user, comment, rating, track and mix to provide the "the same environment for unit tests"
it('Connect to MultiTrackDB_Test', function(done){  
    if (mongoose.connection.db) return done();
    mongoose.connect('mongodb://localhost/MultiTrackDB_Test', done);
});

it('Post user', function(done){ 
 superagent.post('http://localhost:3000/users')
  .send (user)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})

it('Post comment', function(done){  
 superagent.post('http://localhost:3000/comments')
  .send (comment)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})

it('Post track', function(done){  
 superagent.post('http://localhost:3000/tracks')
  .send (track)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})

it('Post rating', function(done){  
 superagent.post('http://localhost:3000/ratings')
  .send (rating)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})

it('Post mix', function(done){  
 superagent.post('http://localhost:3000/mixs')
  .send(mix)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})












// Retrieve the rating with id=0 (The first stocked rating)
it('Retrieve a rating',function(done){
 superagent.get('http://localhost:3000/ratings/'+id)
   .end(function(e,res){
    console.log(res.body)
    expect(e).to.eql(null)
    expect(typeof res.body).to.eql('object')
    done()
   })
})




// Delete the rating with id=1
it('Delete a rating',function(done){
 superagent.del('http://localhost:3000/ratings/'+1)
   .end(function(e,res){
    done()
   })
})




// Updates the rating with id=0 (The first stocked rating)
it('Updates a rating',function(done){
 superagent.put('http://localhost:3000/ratings/'+id)
    .end(function(e,res){
    done()
 })
})



it('Retrieve all ratings',function(done){
 superagent.get('http://localhost:3000/ratings')
   .end(function(e,res){
    console.log(res.body)
    expect(e).to.eql(null)
    expect(res.body.length).to.above(0)
    expect(res.body.map(function(item){return item._id}))
    done()
   })
})



//Drop Database MultiTrackDB_Test
it('Drop Table MultiTrackDB_Test', function(done){ 
  superagent.get('http://localhost:3000/ratings')
   .end(function(e,res){
      console.log(res.body)
      expect(e).to.eql(null)
      expect(res.body.length).to.above(0)
      mongoose.connect('mongodb://localhost/MultiTrackDB_Test', function(err, res) {
      mongoose.connection.db.dropDatabase();  
      });
    done()
    })
})

















/************************************************************************************************************************/

/***********************************************    TEST FOR TRACK  *****************************************************/

/************************************************************************************************************************/

//Connect to Database and insert user, comment, rating, track and mix to provide the "the same environment for unit tests"
it('Connect to MultiTrackDB_Test', function(done){  
    if (mongoose.connection.db) return done();
    mongoose.connect('mongodb://localhost/MultiTrackDB_Test', done);
});

it('Post user', function(done){ 
 superagent.post('http://localhost:3000/users')
  .send (user)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})

it('Post comment', function(done){  
 superagent.post('http://localhost:3000/comments')
  .send (comment)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})

it('Post track', function(done){  
 superagent.post('http://localhost:3000/tracks')
  .send (track)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})

it('Post rating', function(done){  
 superagent.post('http://localhost:3000/ratings')
  .send (rating)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})

it('Post mix', function(done){  
 superagent.post('http://localhost:3000/mixs')
  .send(mix)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})
















// Retrieve the track with id=0 (The first stocked track)
it('Retrieve a track',function(done){
 superagent.get('http://localhost:3000/tracks/'+id)
   .end(function(e,res){
    console.log(res.body)
    expect(e).to.eql(null)
    expect(typeof res.body).to.eql('object')
    done()
   })
})



// Delete the track with id=1
it('Delete a track',function(done){
 superagent.del('http://localhost:3000/tracks/'+1)
   .end(function(e,res){
    done()
   })
})





// Updates the track with id=0 (The first stocked track)
it('Updates a track',function(done){
 superagent.put('http://localhost:3000/tracks/'+id)
    .end(function(e,res){
    done()
 })
})



it('Retrieve all tracks',function(done){
 superagent.get('http://localhost:3000/tracks')
   .end(function(e,res){
    console.log(res.body)
    expect(e).to.eql(null)
    expect(res.body.length).to.above(0)
    expect(res.body.map(function(item){return item._id}))
    done()
   })
})


//Drop Database MultiTrackDB_Test
it('Drop Table MultiTrackDB_Test', function(done){ 
  superagent.get('http://localhost:3000/tracks')
   .end(function(e,res){
      console.log(res.body)
      expect(e).to.eql(null)
      expect(res.body.length).to.above(0)
      mongoose.connect('mongodb://localhost/MultiTrackDB_Test', function(err, res) {
      mongoose.connection.db.dropDatabase();  
      });
    done()
    })
})





















/************************************************************************************************************************/

/***********************************************    TEST FOR MIX ********************************************************/

/************************************************************************************************************************/

//Connect to Database and insert user, comment, rating, track and mix to provide the "the same environment for unit tests"
it('Connect to MultiTrackDB_Test', function(done){  
    if (mongoose.connection.db) return done();
    mongoose.connect('mongodb://localhost/MultiTrackDB_Test', done);
});

it('Post user', function(done){ 
 superagent.post('http://localhost:3000/users')
  .send (user)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})

it('Post comment', function(done){  
 superagent.post('http://localhost:3000/comments')
  .send (comment)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})

it('Post track', function(done){  
 superagent.post('http://localhost:3000/tracks')
  .send (track)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})

it('Post rating', function(done){  
 superagent.post('http://localhost:3000/ratings')
  .send (rating)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})

it('Post mix', function(done){  
 superagent.post('http://localhost:3000/mixs')
  .send(mix)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})




















// Retrieve the mix with id=0 (The first stocked mix)
it('Retrieve a mix',function(done){
 superagent.get('http://localhost:3000/mixs/'+id)
   .end(function(e,res){
    console.log(res.body)
    expect(e).to.eql(null)
    expect(typeof res.body).to.eql('object')
    done()
   })
})





// Delete the mix with id=1 
it('Delete a mix',function(done){
 superagent.del('http://localhost:3000/mixs/'+1)
   .end(function(e,res){
    done()
   })
})



// Updates the mix with id=0 (The first stocked mix)
it('Updates a mix',function(done){
 superagent.put('http://localhost:3000/mixs/'+id)
    .end(function(e,res){
    done()
 })
})




it('Retrieve all mixs',function(done){
 superagent.get('http://localhost:3000/mixs')
   .end(function(e,res){
    console.log(res.body)
    expect(e).to.eql(null)
    expect(res.body.length).to.above(0)
    expect(res.body.map(function(item){return item._id}))
    done()
   })
})


//Drop Database MultiTrackDB_Test
it('Drop Table MultiTrackDB_Test', function(done){ 
  superagent.get('http://localhost:3000/mixs')
   .end(function(e,res){
      console.log(res.body)
      expect(e).to.eql(null)
      expect(res.body.length).to.above(0)
      mongoose.connect('mongodb://localhost/MultiTrackDB_Test', function(err, res) {
      mongoose.connection.db.dropDatabase();  
      });
    done()
    })
})




})


    



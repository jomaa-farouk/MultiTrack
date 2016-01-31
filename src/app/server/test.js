var User = require('./models/user.js');
var Comment = require('./models/comment.js');
var Track = require('./models/track.js');
var Rating = require('./models/rating.js');
var Mix = require('./models/mix.js');

var superagent= require ('superagent');
var expect= require('expect.js');




describe ('Express rest api server',function(){

var id=0;



/****************************************************************************************************************************/

/***********************************************    TEST FOR USER  ********************************************************/

/**************************************************************************************************************************/
var user = new User({
      username:    'John',
      fullname:    'John Lenon',
      mail:        'john@gmail.com',
      passwd:      '123'
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




// Retrieve the user with id=0 (The first stocked user)
it('Retrieve a user',function(done){
 superagent.get('http://localhost:8080/users/'+id)
   .end(function(e,res){
   	console.log(res.body)
   	expect(e).to.eql(null)
   	expect(typeof res.body).to.eql('object')
   	done()
   })
})







it('Retrieve all users',function(done){
 superagent.get('http://localhost:8080/users')
   .end(function(e,res){
   	console.log(res.body)
   	expect(e).to.eql(null)
   	expect(res.body.length).to.above(0)
   	expect(res.body.map(function(item){return item._id}))
   	done()
   })
})



// Delete the user with id=1
it('Delete a user',function(done){
 superagent.del('http://localhost:8080/users/'+1)
   .end(function(e,res){
    done()
   })
})



// Updates the user with id=0 (The first stocked user)
it('Updates a user',function(done){
 superagent.put('http://localhost:8080/users/'+id)
    .end(function(e,res){
    done()
 })
})





/**************************************************************************************************************************/

/***********************************************    TEST FOR COMMENT  *****************************************************/

/**************************************************************************************************************************/
var comment = new Comment({ username : "mongoUser",trackName:"Michael jackson - Beat It", content : "That's a good mix !" , mixName : "michael jackson beat it mix 1"}); 


it('Post comment', function(done){  
 superagent.post('http://localhost:8080/comments')
  .send (comment)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})




// Retrieve the comment with id=0 (The first stocked comment)
it('Retrieve a comment',function(done){
 superagent.get('http://localhost:8080/comments/'+id)
   .end(function(e,res){
    console.log(res.body)
    expect(e).to.eql(null)
    expect(typeof res.body).to.eql('object')
    done()
   })
})







it('Retrieve all comments',function(done){
 superagent.get('http://localhost:8080/comments')
   .end(function(e,res){
    console.log(res.body)
    expect(e).to.eql(null)
    expect(res.body.length).to.above(0)
    expect(res.body.map(function(item){return item._id}))
    done()
   })
})



// Delete the comment with id=1
it('Delete a comment',function(done){
 superagent.del('http://localhost:8080/comments/'+1)
   .end(function(e,res){
    done()
   })
})



// Updates the comment with id=0 (The first stocked comment)
it('Updates a comment',function(done){
 superagent.put('http://localhost:8080/comments/'+id)
    .end(function(e,res){
    done()
 })
})


/*************************************************************************************************************************/

/***********************************************    TEST FOR RATING  *****************************************************/

/*************************************************************************************************************************/
var rating = new Rating({ username : "mongoUser", mixName : "michael jackson beat it mix 1", mark : "3.5" }); 


it('Post rating', function(done){  
 superagent.post('http://localhost:8080/ratings')
  .send (rating)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})




// Retrieve the rating with id=0 (The first stocked rating)
it('Retrieve a rating',function(done){
 superagent.get('http://localhost:8080/ratings/'+id)
   .end(function(e,res){
    console.log(res.body)
    expect(e).to.eql(null)
    expect(typeof res.body).to.eql('object')
    done()
   })
})







it('Retrieve all ratings',function(done){
 superagent.get('http://localhost:8080/ratings')
   .end(function(e,res){
    console.log(res.body)
    expect(e).to.eql(null)
    expect(res.body.length).to.above(0)
    expect(res.body.map(function(item){return item._id}))
    done()
   })
})



// Delete the rating with id=1
it('Delete a rating',function(done){
 superagent.del('http://localhost:8080/ratings/'+1)
   .end(function(e,res){
    done()
   })
})



// Updates the rating with id=0 (The first stocked rating)
it('Updates a rating',function(done){
 superagent.put('http://localhost:8080/ratings/'+id)
    .end(function(e,res){
    done()
 })
})

/************************************************************************************************************************/

/***********************************************    TEST FOR TRACK  *****************************************************/

/************************************************************************************************************************/
var track = new Track({trackName:"Michael jackson - Beat It",piste:'[{pisteMp3:"bassee.mp3"},{pisteMp3:"batterie.mp3"},{pisteMp3:"guitare.mp3"},{pisteMp3:"synthes.mp3"},{pisteMp3:"voix.mp3"}]',singer:"Micheal Jackson",album:"Beat It",type:"Pop",description:"Song of Micheal Jackson",dateOfTrack:"1992-10-21T13:28:06.419Z"}); 


it('Post track', function(done){  
 superagent.post('http://localhost:8080/tracks')
  .send (track)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})




// Retrieve the track with id=0 (The first stocked track)
it('Retrieve a track',function(done){
 superagent.get('http://localhost:8080/tracks/'+id)
   .end(function(e,res){
    console.log(res.body)
    expect(e).to.eql(null)
    expect(typeof res.body).to.eql('object')
    done()
   })
})







it('Retrieve all tracks',function(done){
 superagent.get('http://localhost:8080/tracks')
   .end(function(e,res){
    console.log(res.body)
    expect(e).to.eql(null)
    expect(res.body.length).to.above(0)
    expect(res.body.map(function(item){return item._id}))
    done()
   })
})



// Delete the track with id=1
it('Delete a track',function(done){
 superagent.del('http://localhost:8080/tracks/'+1)
   .end(function(e,res){
    done()
   })
})



// Updates the track with id=0 (The first stocked track)
it('Updates a track',function(done){
 superagent.put('http://localhost:8080/tracks/'+id)
    .end(function(e,res){
    done()
 })
})



/************************************************************************************************************************/

/***********************************************    TEST FOR MIX ********************************************************/

/************************************************************************************************************************/
var mix = new Mix({username: "John", mixName: "MixPop1", trackName: "Micheal Jackson - Beat It",  description: "Mix Pop number 1", frequencies:'[{frequence:"[10,55,58,78,66,10]"},{frequence:"[14,75,28,18,86,100]"}]',gain:'[{gain:"150"},{gain:"175"},{gain:"102"}]',balance:'[{balance:"150"},{balance:"175"},{balance:"102"}]',compressor:"150",impulses:'[{impulse:"150"},{impulse:"175"},{impulse:"102"}]'});




it('Post mix', function(done){  
 superagent.post('http://localhost:8080/mixs')
  .send(mix)
    .end(function(e,res){
   console.log(res.body)
   expect(e).to.eql(null)
   done()
 })
})




// Retrieve the mix with id=0 (The first stocked mix)
it('Retrieve a mix',function(done){
 superagent.get('http://localhost:8080/mixs/'+id)
   .end(function(e,res){
    console.log(res.body)
    expect(e).to.eql(null)
    expect(typeof res.body).to.eql('object')
    done()
   })
})







it('Retrieve all mixs',function(done){
 superagent.get('http://localhost:8080/mixs')
   .end(function(e,res){
    console.log(res.body)
    expect(e).to.eql(null)
    expect(res.body.length).to.above(0)
    expect(res.body.map(function(item){return item._id}))
    done()
   })
})



// Delete the mix with id=1 
it('Delete a mix',function(done){
 superagent.del('http://localhost:8080/mixs/'+1)
   .end(function(e,res){
    done()
   })
})



// Updates the mix with id=0 (The first stocked mix)
it('Updates a mix',function(done){
 superagent.put('http://localhost:8080/mixs/'+id)
    .end(function(e,res){
    done()
 })
})



})

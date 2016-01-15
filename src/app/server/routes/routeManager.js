/**
 * @module      :: Routes
 * @description :: Maps routes and actions
 */

var User = require('../models/user.js');
var Comment = require('../models/comment.js');
var Track = require('../models/track.js');
var Rating = require('../models/rating.js');








module.exports = function(app) {




/****************************************************************************************************************************/

/***********************************************    HANDLE USERS     ********************************************************/

/****************************************************************************************************************************/

/****************************************************************************************************************************/



  /**
   * Find and retrieves all Users
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  findAllUsers = function(req, res) {
    console.log("GET - /users");
    return User.find(function(err, users) {
      if(!err) {
        return res.json(users);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };



  /**
   * Find and retrieves a single user by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  findById = function(req, res) {

    console.log("GET - /users/:id");
    return User.findById(req.params.id, function(err, user) {

      if(!user) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if(!err) {
        return res.send({ status: 'OK', user:user });
      } else {

        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };




  /**
   * Creates a new user from the data request
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  addUser = function(req, res) {

    console.log('POST - /users');

    var user = new User({
      username:    req.body.username,
      fullname:    req.body.fullname,
      mail:        req.body.mail,
      passwd:      req.body.passwd
    });

    user.save(function(err) {

      if(err) {

        console.log('Error while saving User: ' + err);
        res.send({ error:err });
        return;

      } else {

        console.log("User created");
        return res.send({ status: 'OK', user:user });

      }

    });

  };



  /**
   * Update a user by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  updateUser = function(req, res) {

    console.log("PUT - /users/:id");
    return User.findById(req.params.id, function(err, user) {
      
      if(!user) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if (req.body.username != null) user.username= req.body.username;
      if (req.body.fullname!= null) user.fullname= req.body.fullname;
      if (req.body.mail!= null) user.mail = req.body.mail;
      if (req.body.passwd != null) user.passwd = req.body.passwd;

      return user.save(function(err) {
        if(!err) {
          console.log('Updated');
          return res.send({ status: 'OK', user:user });
        } else {
          if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
          }
          console.log('Internal error(%d): %s',res.statusCode,err.message);
        }

        res.send(user);

      });
    });
  };



  /**
   * Delete a user by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  deleteUser = function(req, res) {

    console.log("DELETE - /users/:id");
    return User.findById(req.params.id, function(err, user) {
      if(!user) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      return user.remove(function(err) {
        if(!err) {
          console.log('Removed user');
          return res.send({ status: 'OK' });
        } else {
          res.statusCode = 500;
          console.log('Internal error(%d): %s',res.statusCode,err.message);
          return res.send({ error: 'Server error' });
        }
      })
    });
  }





/****************************************************************************************************************************/

/***********************************************     HANDLE COMMENTS    *****************************************************/

/****************************************************************************************************************************/

/****************************************************************************************************************************/


  /**
   * Find and retrieves all Comments
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  findAllComments = function(req, res) {
    console.log("GET - /comments");
    return Comment.find(function(err, comments) {
      if(!err) {
        return res.send(comments);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };



  /**
   * Find and retrieves a single comment by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  findCommentById = function(req, res) {

    console.log("GET - /comments/:id");
    return Comment.findById(req.params.id, function(err, comment) {

      if(!comment) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if(!err) {
        return res.send({ status: 'OK', comment:comment });
      } else {

        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };




  /**
   * Creates a new comment from the data request
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  addComment = function(req, res) {

    console.log('POST - /comments');

    var comment = new Comment({
      username:    req.body.username,
      content:    req.body.content,
      mixName:    req.body.mixName
    });

    comment.save(function(err) {

      if(err) {

        console.log('Error while saving Comment: ' + err);
        res.send({ error:err });
        return;

      } else {

        console.log("Comment created");
        return res.send({ status: 'OK', comment:comment });

      }

    });

  };



  /**
   * Update a comment by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  updateComment = function(req, res) {

    console.log("PUT - /comments/:id");
    return Comment.findById(req.params.id, function(err, comment) {

      if(!comment) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if (req.body.username != null) user.username= req.body.username;
      if (req.body.comment!= null) user.comment= req.body.comment;
      if (req.body.mixName!= null) user.mixName= req.body.mixName;

      return comment.save(function(err) {
        if(!err) {
          console.log('Updated');
          return res.send({ status: 'OK', comment:comment });
        } else {
          if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
          }
          console.log('Internal error(%d): %s',res.statusCode,err.message);
        }

        res.send(comment);

      });
    });
  };



  /**
   * Delete a comment by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  deleteComment = function(req, res) {

    console.log("DELETE - /comments/:id");
    return Comment.findById(req.params.id, function(err, comment) {
      if(!comment) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      return comment.remove(function(err) {
        if(!err) {
          console.log('Removed comment');
          return res.send({ status: 'OK' });
        } else {
          res.statusCode = 500;
          console.log('Internal error(%d): %s',res.statusCode,err.message);
          return res.send({ error: 'Server error' });
        }
      })
    });
  }




/****************************************************************************************************************************/

/***********************************************    HANDLE RATINGS   ********************************************************/

/****************************************************************************************************************************/

/****************************************************************************************************************************/




/**
   * Find and retrieves all ratings
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  findAllRatings = function(req, res) {
    console.log("GET - /ratings");
    return Rating.find(function(err, ratings) {
      if(!err) {
        return res.send(ratings);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };



  /**
   * Find and retrieves a single rating by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  findRatingById = function(req, res) {

    console.log("GET - /ratings/:id");
    return Rating.findById(req.params.id, function(err, comment) {

      if(!rating) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if(!err) {
        return res.send({ status: 'OK', rating:rating });
      } else {

        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };




  /**
   * Creates a new rating from the data request
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  addRating = function(req, res) {

    console.log('POST - /ratings');

    var rating = new Rating({
      username:    req.body.username,
      mixName:    req.body.mixName,
      mark: req.body.mark
    });

   rating.save(function(err) {

      if(err) {

        console.log('Error while saving Rating: ' + err);
        res.send({ error:err });
        return;

      } else {

        console.log("Rating created");
        return res.send({ status: 'OK', rating:rating });

      }

    });

  };



  /**
   * Update a rating by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  updateRating = function(req, res) {

    console.log("PUT - /ratings/:id");
    return Rating.findById(req.params.id, function(err, rating) {

      if(!rating) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if (req.body.username != null) user.username= req.body.username;
      if (req.body.mixName != null) user.mixName= req.body.mixName;
      if (req.body.mark != null) user.mark=rq.body.mark;

      return rating.save(function(err) {
        if(!err) {
          console.log('Updated');
          return res.send({ status: 'OK', rating:rating });
        } else {
          if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
          }
          console.log('Internal error(%d): %s',res.statusCode,err.message);
        }

        res.send(rating);

      });
    });
  };



  /**
   * Delete a rating by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  deleteRating = function(req, res) {

    console.log("DELETE - /ratings/:id");
    return Rating.findById(req.params.id, function(err, rating) {
      if(!rating) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      return rating.remove(function(err) {
        if(!err) {
          console.log('Removed rating');
          return res.send({ status: 'OK' });
        } else {
          res.statusCode = 500;
          console.log('Internal error(%d): %s',res.statusCode,err.message);
          return res.send({ error: 'Server error' });
        }
      })
    });
  }





/****************************************************************************************************************************/

/***********************************************     HANDLE TRACKS   ********************************************************/

/****************************************************************************************************************************/

/****************************************************************************************************************************/





/**
   * Find and retrieves all Tracks
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  findAllTracks = function(req, res) {
    console.log("GET - /tracks");
    return Track.find(function(err, tracks) {
      if(!err) {
        return res.send(tracks);
      } else {
        res.statusCode = 500;
        console.log('Internal error(%d): %s',res.statusCode,err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };



  /**
   * Find and retrieves a single track by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  findTrackById = function(req, res) {

    console.log("GET - /tracks/:id");
    return Track.findById(req.params.id, function(err, track) {

      if(!track) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if(!err) {
        return res.send({ status: 'OK', track:tr });
      } else {

        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      }
    });
  };




  /**
   * Creates a new track from the data request
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  addTrack = function(req, res) {

    console.log('POST - /tracks');

    var track = new Track({
      trackName: req.body.trackName,
      pisteGuitar: req.body.pisteGuitar,
      pisteSong: req.body.pisteSong,
      singer: req.body.singer,
      album: req.body.album,
      type: req.body.type,
      description: req.body.description
    });

    track.save(function(err) {

      if(err) {

        console.log('Error while saving Track: ' + err);
        res.send({ error:err });
        return;

      } else {

        console.log("Track created");
        return res.send({ status: 'OK', track:track });

      }

    });

  };



  /**
   * Update a track by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  updateTrack = function(req, res) {

    console.log("PUT - /tracks/:id");
    return Track.findById(req.params.id, function(err, track) {

      if(!track) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if (req.body.trackName != null) track.trackNname= req.body.trackNname;
      if (req.body.pisteGuitar!= null) track.pisteGuitar= req.body.pisteGuitar;
      if (req.body.pisteSong!= null) track.pisteSong = req.body.pisteSong;
      if (req.body.singer != null) track.singer = req.body.singer;
      if (req.body.album != null) track.album = req.body.album;
      if (req.body.type != null) track.type= req.body.type;
      if (req.body.des!= null) track.description = req.body.description;

      return track.save(function(err) {
        if(!err) {
          console.log('Updated');
          return res.send({ status: 'OK', track:track });
        } else {
          if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Validation error' });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Server error' });
          }
          console.log('Internal error(%d): %s',res.statusCode,err.message);
        }

        res.send(track);

      });
    });
  };



  /**
   * Delete a track by its ID
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  deleteTrack = function(req, res) {

    console.log("DELETE - /tracks/:id");
    return Track.findById(req.params.id, function(err, track) {
      if(!track) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      return track.remove(function(err) {
        if(!err) {
          console.log('Removed track');
          return res.send({ status: 'OK' });
        } else {
          res.statusCode = 500;
          console.log('Internal error(%d): %s',res.statusCode,err.message);
          return res.send({ error: 'Server error' });
        }
      })
    });
  }



















  //Link routes and actions
  


  app.get('/users', findAllUsers);
  app.get('/users/:id', findById);
  app.post('/users', addUser);//{ "username" : "mongoUser", "fullname" : "UserFullName", "mail" : "mg@gmail.com", "passwd" : "1234" }
  app.put('/users/:id', updateUser);
  app.delete('/users/:id', deleteUser);



  app.get('/comments', findAllComments);
  app.get('/comments/:id', findCommentById);
  app.post('/comments', addComment);//{ "username" : "mongoUser", "content" : "That's a good mix !" ,"mixName" : "michael jackson beat it mix 1"}
  app.put('/comments/:id', updateComment);
  app.delete('/comments/:id', deleteComment);



  app.get('/ratings', findAllRatings);
  app.get('/ratings/:id', findRatingById);
  app.post('/ratings', addRating);//{ "username" : "mongoUser", "mixName" : "michael jackson beat it mix 1", "mark" : "3.5" }
  app.put('/ratings/:id', updateRating);
  app.delete('/ratings/:id', deleteRating);



  app.get('/tracks', findAllTracks);
  app.get('/tracks/:id', findTrackById);
  app.post('/tracks', addTrack);
  app.put('/tracks/:id', updateTrack);
  app.delete('/tracks/:id', deleteTrack);



}





/**
 * Rating
 * @module      :: Routes
 * @description :: Maps routes and actions
 */

var Rating = require('../models/rating.js');

module.exports = function(app) {


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
  findById = function(req, res) {

    console.log("GET - /rating/:id");
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

    console.log('POST - /rating');

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

    console.log("PUT - /rating/:id");
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

    console.log("DELETE - /rating/:id");
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

  //Link routes and actions
  app.get('/ratings', findAllRatings);
  app.get('/ratings/:id', findById);
  app.post('/ratings', addCRating);
  app.put('/ratings/:id', updateRating);
  app.delete('/ratings/:id', deleteRating);

}



//{ "username" : "mongoUser", "mixName" : "michael jackson beat it mix 1", "mark" : "3.5" }
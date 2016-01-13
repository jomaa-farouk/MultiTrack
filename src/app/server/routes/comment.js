/**
 * Comment
 * @module      :: Routes
 * @description :: Maps routes and actions
 */

var Comment = require('../models/comment.js');

module.exports = function(app) {


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
  findById = function(req, res) {

    console.log("GET - /comment/:id");
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

    console.log('POST - /comment');

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

    console.log("PUT - /comment/:id");
    return Comment.findById(req.params.id, function(err, comment) {

      if(!comment) {
        res.statusCode = 404;
        return res.send({ error: 'Not found' });
      }

      if (req.body.username != null) user.username= req.body.username;
      if (req.body.comment!= null) user.comment= req.body.comment;
      if (req.body.mixName!= null) user.comment= req.body.mix;

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

    console.log("DELETE - /comment/:id");
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

  //Link routes and actions
  app.get('/comments', findAllComments);
  app.get('/comments/:id', findById);
  app.post('/comments', addComment);
  app.put('/comments/:id', updateComment);
  app.delete('/comments/:id', deleteComment);

}



//{ "username" : "mongoUser", "content" : "That's a good mix !" ,"mixName" : "michael jackson beat it mix 1"}
/**
 * User
 * @module      :: Routes
 * @description :: Maps routes and actions
 */

var User = require('../models/user.js');

module.exports = function(app) {


  /**
   * Find and retrieves all Users
   * @param {Object} req HTTP request object.
   * @param {Object} res HTTP response object.
   */
  findAllUsers = function(req, res) {
    console.log("GET - /users");
    return User.find(function(err, users) {
      if(!err) {
        return res.send(users);
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

  //Link routes and actions
  app.get('/users', findAllUsers);
  app.get('/users/:id', findById);
  app.post('/users', addUser);
  app.put('/users/:id', updateUser);
  app.delete('/users/:id', deleteUser);

}



//{ "username" : "mongoUser", "fullname" : "UserFullName", "mail" : "mg@gmail.com", "passwd" : "1234" }
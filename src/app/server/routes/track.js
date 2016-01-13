/**
 * Track
 * @module      :: Routes
 * @description :: Maps routes and actions
 */

var Track = require('../models/track.js');

module.exports = function(app) {


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
  findById = function(req, res) {

    console.log("GET - /track/:id");
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

    console.log('POST - /track');

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

    console.log("PUT - /track/:id");
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

    console.log("DELETE - /track/:id");
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
  app.get('/tracks', findAllTracks);
  app.get('/tracks/:id', findById);
  app.post('/tracks', addTrack);
  app.put('/tracks/:id', updateTrack);
  app.delete('/tracks/:id', deleteTrack);

}

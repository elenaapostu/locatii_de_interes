'use strict';


var mongoose = require('mongoose'),
  Loc = mongoose.model('LocuriDeVizitat');

exports.list_all_locations = function(req, res) {
  Loc.find({}, function(err, loc) {
    if (err){
      res.send(err);
    }
    res.json(loc);
  });
};




exports.create_a_location = function(req, res) {
  var new_loc = new Loc(req.body);
  new_loc.save(function(err, loc) {
    if (err){
      res.send(err);
    }
    res.json(loc);
  });
};


exports.read_a_location = function(req, res) {
  Loc.findById(req.params.locId, function(err, loc) {
    if (err){
      res.send(err);
    }
    res.json(loc);
  });
};


exports.update_a_location = function(req, res) {
  Loc.findOneAndUpdate({_id: req.params.locId}, req.body, {new: true}, function(err, loc) {
    if (err){
      res.send(err);
    }
    res.json(loc);
  });
};


exports.delete_a_location = function(req, res) {


  Loc.remove({
    _id: req.params.locId
  }, function(err, loc) {
    if (err){
      res.send(err);
    }
    res.json({ message: 'Location succesfully deleted' });
  });
};

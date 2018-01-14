'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var LocatiiSchema = new Schema({
  name: {
    type: String,
    required: 'Enter the name of the location'
  },
  visit_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['visited', 'to_visit', 'will_visit']
    }],
    default: ['to_visit']
  }
});

module.exports = mongoose.model('LocuriDeVizitat', LocatiiSchema);

'use strict';
module.exports = function(app) {
  var locatii = require('../controllers/locatiiController');

  // locatii Routes
  app.route('/locuri')
    .get(locatii.list_all_locations)
    .post(locatii.create_a_location);


  app.route('/locuri/:locuriId')
    .get(locatii.read_a_location)
    .put(locatii.update_a_location)
    .delete(locatii.delete_a_location);
};

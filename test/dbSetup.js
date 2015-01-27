'use strict';

var config = require('../config'),
    mongoose = require('mongoose');
    
mongoose.models = {};
mongoose.modelSchemas = {};

// ensure the NODE_ENV is set to 'test'
process.env.NODE_ENV = 'test';

beforeEach(function (done) {

  function clearDB() {
    var collections = Object.keys(mongoose.connection.collections);
    var numRemoved = 0; 
    if (collections.length === 0) {
      return done();
    }
    collections.forEach(function (collection) {
      mongoose.connection.collections[collection].remove(function () {
        numRemoved += 1;
        if (numRemoved === collections.length) {
          return done();
        }
      });
    });
  }

  if (mongoose.connection.readyState === 0) {
    mongoose.connect(config.mongo.url, function (err) {
      if (err) {
        throw err;
      }
      return clearDB();
    });
  } else {
    return clearDB();
  }
});
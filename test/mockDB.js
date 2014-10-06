'use strict';

var mongoose = require('mongoose');
var mockgoose = require('mockgoose'); //mock database
    mongoose.models = {};
    mongoose.modelSchemas = {};
    mockgoose(mongoose); // let mongoose use in-momory mock mongodb
var config = require('../config');

module.exports = {
  mongoose: mongoose,
  init: function () {
    if(!mongoose.connection.readyState) {
      mongoose.connect(config.mongo.url);
    }
    mockgoose.reset();
  },
  reset: function () {
    mockgoose.reset();      
  }
};
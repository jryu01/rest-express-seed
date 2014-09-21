/**
 * configuration file
 *
 */

'use strict';

var _ = require('lodash');

var config = (function (env) {
  var conf = {};

  // Common configuration
  conf.common =  {
    app: {
      name: "rest-express-seed"
    },
    port: process.env.PORT || 3000,
    mongo: {}
  };

  // Development configuration
  conf.development = {
    env: "development",
    mongo: {
      url: "mongodb://localhost/rest-express-seed-dev"
    }
  };

  // Test configuration
  conf.test = {
    env: "test",
    port: process.env.PORT || 3030,
    mongo: {
      url: "mongodb://localhost/rest-express-seed-test"
    },
  };

  // Production configuration
  conf.production = {
    env: "production",
  };

  return _.merge(conf.common, conf[env]);

})(process.env.NODE_ENV || 'development');

module.exports = config;
'use strict';

var methodOverride = require('method-override');
var errorHandler = require('./lib/errorHandler.js');
var bodyParser = require('body-parser');
var express = require('express');
var logger  = require('morgan'); // HTTP request logger
var config = require('./config');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
if (config.env === 'development') {
  app.use(logger('dev'));
}
app.use('/api', require('./routes'));
app.use(errorHandler());

module.exports = app;
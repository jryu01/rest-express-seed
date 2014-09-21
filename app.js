'use strict';

var methodOverride = require('method-override');
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

app.use('/api', require('./routes/user'));

// error handler
app.use(function (err, req, res, next) {

  switch (err.name) {
    case 'ValidationError':
      var msgArray = [];
      for (var error in err.errors) {
        msgArray.push(err.errors[error].message);
      }
      err.status = 400;
      err.message = msgArray.join();
      break;
  }
  res.status(err.status || 500);
  res.json({ message: err.message });
});

module.exports = app;
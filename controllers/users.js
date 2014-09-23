'use strict';

var User = require('../models/user');

var usersController = exports;

usersController.list = function (req, res, next) {
  User.find({}, function (err, users) {
    if (err) { return next(err); }
    res.json(users);
  });
};

usersController.get = function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) { return next(err); }
    res.json(user);
  });
};

usersController.create = function (req, res, next) {
  var user = new User(req.body);
  user.save(function (err) {
    if (err) { return next(err); }
    res.json(user);
  }); 
};
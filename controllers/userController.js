'use strict';

var userController = {};

userController.User = require('../models/user');

userController.list = function (req, res, next) {
  userController.User.find({}, function (err, users) {
    if (err) { return next(err); }
    res.json(users);  
  });
};

userController.get = function (req, res, next) {
  userController.User.findById(req.params.id, function (err, user) {
    if (err) { return next(err); }
    res.json(user);
  });
};

userController.post = function (req, res, next) {
  userController.User.create(req.body, function (err, user) {
    if (err) { return next(err); }
    res.json(user);
  });
};

module.exports = userController;
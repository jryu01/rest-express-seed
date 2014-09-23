'use strict';

var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/users', function (req, res, next) {
  User.find({}, function (err, users) {
    if (err) { return next(err); }
    res.json(users);
  });
});

router.get('/users/:id', function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) { return next(err); }
    res.json(user);
  });
});

router.post('/users', function (req, res, next) {

  var user = new User(req.body);

  user.save(function (err) {
    if (err) { return next(err); }
    res.json(user);
  }); 
});

module.exports = router;
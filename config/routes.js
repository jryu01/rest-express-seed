'use strict';

var express = require('express');
var router = express.Router();
var controllers = require('../controllers');

router.get('/users', controllers.users.list);
router.get('/users/:id', controllers.users.get);
router.post('/users/', controllers.users.create);

module.exports = router;
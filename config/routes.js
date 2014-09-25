'use strict';

var userController = require('../controllers/userController');

module.exports = function (app) {

  app.post('/api/users/', userController.post);
  app.get('/api/users', userController.list);
  app.get('/api/users/:id', userController.get);
  
};
'use strict';
/*jshint expr: true*/

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);

var _ = require('lodash');


var reqFactory = {
  create: function (overwrites) {
    var defaults = {
      body: {
        name: 'Jhon',
        email: 'jhon@jhonhome.com'
      },
      params: {},
      query: {},
    };
    return _.extend(defaults, overwrites);
  }
};

describe('userController', function () {

  var controller, req, res, next, User;

  beforeEach(function () {
    User = { 
      create: sinon.stub(), 
      find: sinon.stub(),
      findById: sinon.stub()
    };
    req = reqFactory.create(); 
    res = { json: sinon.spy(), next: sinon.spy() };
    next = sinon.spy();

    controller = require('../../controllers/userController');
    controller.User = User;
  });

  describe('#post', function () {

    it('should create a user from request body', function () {
      controller.post(req, res, next);
      expect(User.create).to.have.been.calledOnce;
      expect(User.create).to.have.been.calledWith(req.body);
    });

    it('should respond with created user on success', function () {
      var result = { id:1, name: req.body.name, email: req.body.email };
      User.create.callsArgWith(1, null, result);
      controller.post(req, res, next);
      expect(res.json).to.have.been.calledOnce;
      expect(res.json).to.have.been.calledWith(result);
    });

    it('should ruturn by calling next with an error on failure', function () {
      User.create.callsArgWith(1, { err: 'err'}, null);
      controller.post(req, res, next);
      expect(next).to.have.been.calledOnce;
      expect(next).to.have.been.calledWith({ err: 'err' });
      expect(res.json).to.have.not.been.called;
    });

  });

  describe('#list', function () {
    it('should find users', function () {
      controller.list(req, res, next);
      expect(User.find).to.have.been.called;
    });

    it('should respond with find result on success', function () {
      User.find.callsArgWith(1, null, [{user: 'Jhon'}]);
      controller.list(req, res, next); 
      expect(res.json).to.have.been.calledWith([{user: 'Jhon'}]);
      expect(next).to.have.not.beenCalled;
    });

    it('should return by calling next with an error on failure', function () {
      User.find.callsArgWith(1, { err: 'some error' }, null);
      controller.list(req, res, next);
      expect(next).to.have.been.calledWith({ err: 'some error' });
      expect(res.json).to.have.not.been.called;
    });
  });

  describe('#get', function () {

    beforeEach(function () {
      req.params.id = '123abcd';
    });

    it('should find a user by id', function () {
      controller.get(req, res, next);  
      expect(User.findById).to.have.been.calledWith('123abcd');
    });

    it('should respond with find result on success', function () {
      User.findById.callsArgWith(1, null, {user: 'Jhon'});
      controller.get(req, res, next); 
      expect(res.json).to.have.been.calledWith({user: 'Jhon'});
    });

    it('should return by calling next with an error on failure', function () {
      User.findById.callsArgWith(1, { err: 'findbyId error' }, null); 
      controller.get(req, res, next);
      expect(next).to.have.been.calledWith({ err: 'findbyId error'});
      expect(res.json).to.have.not.been.called;
    });
  });

});
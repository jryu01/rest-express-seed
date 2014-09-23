'use strict';
/*jshint expr: true*/

var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);

var errorHandler = require('../lib/errorHandler');

describe('lib: errorHandler', function () {

  var eHandler = errorHandler();
  var err, req, res, next;


  beforeEach(function () {
    // test doubles
    err = {};
    req = {};
    res = { json: sinon.spy(), status: sinon.spy() };
    next = sinon.spy(); 
  });

  it('should be a function', function () {
    expect(eHandler).to.be.a('function');
  });

  it('should call res.status with 500', function () {
    eHandler(err, req, res, next);
    expect(res.status).to.have.been.calledOnce;
    expect(res.status).to.have.been.calledWith(500);
  });

  it('should call res.json with error message', function () {
    err = new Error('Unexpected server error'); 
    eHandler(err, req, res, next);
    expect(res.json).to.have.been.calledOnce;
    expect(res.json).to.have.been.calledWith({
      message: 'Unexpected server error'
    });
  });

  describe('with mongoose ValidationError', function () {
    beforeEach(function () {
      // mongoose error obj
      err = { 
        message: 'Validation failed',
        name: 'ValidationError',
        errors: {
          name: { 
            message: 'name is required!',
            name: 'ValidatorError',
            path: 'name',
            type: 'required',
            value: undefined 
          }
        }
      };

    });

    it('should call res.status with 400', function () {
      eHandler(err, req, res, next);
      expect(res.status).to.have.been.calledWith(400);
    });

    it('should call res.json with a error message', function () {
      eHandler(err, req, res, next);
      expect(res.json).to.have.been.calledWith({ message: 'name is required!'});
    });  

    it('should call res.json with a message containing multiple ' +
      'error messages seperated by comma', function () {
      err.errors.email = {
        message: 'email is required!',
        name: 'ValidatorError',
        path: 'email',
        type: 'required',
        value: undefined 
      };
      eHandler(err, req, res, next);
      expect(res.json).to.have.been.calledWith({
        message:'name is required!,email is required!'
      });
    });

  });

});
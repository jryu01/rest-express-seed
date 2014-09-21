'use strict';

var mongoose = require('mongoose');
    mongoose.models = {};
    mongoose.modelSchemas = {};
var request = require('supertest');
var expect = require('chai').expect;
var config = require('../config');
var app = require('../app');

describe('User route', function () {

  before(function (done) {
    request = request(app);
    mongoose.connect(config.mongo.url);
    done();
  });

  describe('with POST request', function () {

    it('should save a user to db and return it', function (done) {
      request.post('/api/users').send({ name: 'Jhon' })
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) { done(err); }
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('name', 'Jhon');
        done();
      });
    });

    it('should respond with 400 error when name is missing', function (done) {
      request.post('/api/users').send({})
      .expect('Content-Type', /json/)
      .expect(400)
      .expect(/name is required!/, done);
    });

  });

  // describe('with GET reqeust', function () {

  //   beforeEach(function (done) {
  //     request.post('/api/users').send({ name: 'Peter'}).expect(200, done);
  //   });

  //   it('should retrievs array of users', function (done) {
  //     request.post('/api/users')
  //   });
  // });

  after(function(done){
    mongoose.connection.db.dropDatabase(function(){
        mongoose.connection.close(function(){
          done();
        });
    });
  });
});
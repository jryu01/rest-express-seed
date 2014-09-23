'use strict';

if ( process.env.NODE_ENV !== 'test' ) {
  console.log('NODE_ENV=' + process.env.NODE_ENV + ' which might cause problems.');
  process.exit(1);
}

var mongoose = require('mongoose');
    mongoose.models = {};
    mongoose.modelSchemas = {};
var request = require('supertest');
var expect = require('chai').expect;
var config = require('../config');
var app = require('../app');
var _ = require('lodash');

var createUser = function (overwrites) {
  var defaults= { name: 'Jhon', email: 'example@example.com' };

  return _.extend(defaults, overwrites);
};

describe('User route', function () {

  before(function (done) {
    request = request(app);
    mongoose.connect(config.mongo.url);
    done();
  });

  after(function (done){
    mongoose.connection.db.dropDatabase(function(){
        mongoose.connection.close(function(){
          done();
        });
    });
  });

  describe('with POST request', function () {

    it('should save a user to db and return it', function (done) {
      request.post('/api/users').send(createUser())
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) { done(err); }
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('name', 'Jhon');
        expect(res.body).to.have.property('email', 'example@example.com');
        done();
      });
    });

    it('should respond with 400 error when name is missing', function (done) {
      var user = createUser();
      delete user.name;
      request.post('/api/users').send(user)
      .expect('Content-Type', /json/)
      .expect(400)
      .expect(/name is required!/, done);
    });

    it('should respond with 400 error when email is missing', function (done) {
      var user = createUser();
      delete user.email;
      request.post('/api/users').send(user)
      .expect('Content-Type', /json/)
      .expect(400)
      .expect(/email is required!/, done);
    });

  });

  describe('with GET reqeust', function () {

    var peter, bob;

    before(function (done) {
      request.post('/api/users').send(createUser({ name: 'Peter' }))
        .expect(200, function (err, res) {
        peter = res.body;
        request.post('/api/users').send(createUser({ name: 'Bob' }))
          .expect(200, function (err, res) {
          bob = res.body;
          request.post('/api/users').send(createUser({ name: 'Sandy' })).expect(200, done);
        });
      });
    });

    it('should retreive array of users', function (done) {
      request.get('/api/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) { done(err); }
          expect(res.body).to.be.an('array').that.has.length.above(2);
          expect(JSON.stringify(res.body)).to.match(/Peter/);
          expect(JSON.stringify(res.body)).to.match(/Bob/);
          expect(JSON.stringify(res.body)).to.match(/Sandy/);
          done();
        });
    });

    it('should retreive a specific user with id', function (done) {
      request.get('/api/users/' + peter.id)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) { done(err); }
          expect(res.body).to.have.property('id', peter.id);
          expect(res.body).to.have.property('name', peter.name);
          done();
        });
    });
  });
});
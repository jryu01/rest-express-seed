'use strict';
/*jshint expr: true*/

require('./dbSetup');

var request = require('supertest');
var expect = require('chai').expect;
var _ = require('lodash');

var dataFactory = { 
  create: function (overwrites) {
    var defaults = { name: 'Jhon', email: 'example@example.com' };
    return _.extend(defaults, overwrites);
  }
};

describe('Managing user resource', function () {

  var app, User, data;

  beforeEach(function () {
    app = require('../app');
    User = require('../models/user');
  });

  describe('with POST request', function () {

    beforeEach(function () {
      data = dataFactory.create();
    });

    it('should save a user to db and return it', function (done) {
      request(app).post('/api/users').send(data)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) { done(err); }
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('name', 'Jhon');
        expect(res.body).to.have.property('email', 'example@example.com');

        User.find({}, function (err, users) {
          expect(users).to.be.an('array');
          expect(users[0]).to.have.property('id');
          expect(res.body).to.have.property('name', 'Jhon');
          expect(res.body).to.have.property('email', 'example@example.com');
          done();
        });
      });
    });

    it('should respond with 400 error when name is missing', function (done) {
      delete data.name;
      request(app).post('/api/users').send(data)
      .expect('Content-Type', /json/)
      .expect(400)
      .expect(/name is required!/, done);
    });

    it('should respond with 400 error when both name and email is missing', function (done) {
      request(app).post('/api/users').send({})
      .expect('Content-Type', /json/)
      .expect(400)
      .expect(/name is required!/)
      .expect(/email is required!/, done);
    });

  });

  describe('with GET reqeust', function () {

    beforeEach(function (done) {
      var num = 3;
      var names = ['Peter', 'Bob', 'Sandy'];
      var createCallback = function (i) {
        return function (err, user) {
          if (err) { done(err); }
          if (i === num) { done(); }
        };
      };
      for (var i = 0; i < num; i++) {
        data = dataFactory.create({ name: names[i]});
        User.create(data, createCallback(i+1)); 
      }
    });

    it('should retreive array of users', function (done) {
      request(app).get('/api/users')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) { done(err); }
          expect(res.body).to.be.an('array').that.has.length(3);
          expect(JSON.stringify(res.body)).to.match(/Peter/);
          expect(JSON.stringify(res.body)).to.match(/Bob/);
          expect(JSON.stringify(res.body)).to.match(/Sandy/);
          done();
        });
    });

    it('should retreive a specific user with id', function (done) {
      User.findOne(function (err, user) {
        request(app).get('/api/users/' + user.id)
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
            if (err) { done(err); }
            expect(res.body).to.have.property('id', user.id);
            expect(res.body).to.have.property('name', user.name);
            done();
          });
      });
    });
  });
});
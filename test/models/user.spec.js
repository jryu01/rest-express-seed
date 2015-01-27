'use strict';
/*jshint expr: true*/

var expect = require('chai').expect;
var _ = require('lodash');

var dataFactory = {
  create: function (overwrites) {
    var defaults = {
      name: 'Jhon',
      email: 'jhon@jhonhome.com'
    };
    return _.extend(defaults, overwrites);
  }
};

describe('User', function () {

  var User, data;

  beforeEach(function () {
    User = require('../../models/user');
  });

  it('should have a name', function () {
    data = dataFactory.create();
    User.create(data, function (err, user) {
      expect(err).to.be.null;
      expect(user.name).to.equal('Jhon');
    });
  });

  it('should have an email', function () {
    data = dataFactory.create();
    User.create(data, function (err, user) {
      expect(err).to.be.null;
      expect(user.email).to.equal('jhon@jhonhome.com');
    });
  });

  it('should give an error when name is missing', function() {
    User.create({}, function (err, user) {
      expect(user).to.not.be.ok;
      expect(err).to.match(/name is required!/);
    });
  });

  it('should give an error when email is missing', function() {
    User.create({}, function (err, user) {
      expect(user).to.not.be.ok;
      expect(err).to.match(/email is required!/);
    });
  });

  it('should have #toJSON to get clean json', function () {
    data = dataFactory.create();
    User.create(data, function (err, user) {
      expect(err).to.be.null; 
      expect(user.toJSON()).to.have.property('id');
      expect(user.toJSON()).to.not.have.property('_id');
      expect(user.toJSON()).to.not.have.property('__V');
    });
  });

});
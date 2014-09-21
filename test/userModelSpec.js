'use strict';

var expect = require('chai').expect;
var User = require('../models/user');


describe('User', function () {

  var user;

  it('should have a name', function () {
    user = new User({ name: 'Jhon'});
    expect(user.name).to.equal('Jhon');
  });

  it('should have .toJSON to get clean json', function () {
    user = new User({ name: 'Sam' });
    expect(user.toJSON()).to.not.have.property('_id');
    expect(user.toJSON()).to.have.property('id');
    expect(user.toJSON()).to.not.have.property('__V');
  });
  
});
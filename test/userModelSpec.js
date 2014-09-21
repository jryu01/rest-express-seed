'use strict';

var expect = require('chai').expect;
var User = require('../models/user');


describe('User', function () {

  var user;

  it('should have a name', function (done) {
    user = new User({ name: 'Jhon'});
    expect(user.name).to.equal('Jhon');
    done();
  });
});
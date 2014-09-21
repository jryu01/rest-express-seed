'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var UserSchema = new Schema({
  name: { type: String, required: '{PATH} is required!' }
});

/**
 * Add toJSON option to transform document before returnig the result
 */
UserSchema.options.toJSON = {
  transform: function (doc, ret, options) {

    // add id feild and remove _id and __v
    ret.id = ret._id;

    delete ret._id;
    delete ret.__v;
  }
};
 
module.exports = mongoose.model('User', UserSchema);

'use strict';

var errorHanlder = function () {
  return function (err, req, res, next) {

    switch (err.name) {
      case 'ValidationError':
        var msgs = [];
        for (var error in err.errors) {
          msgs.push(err.errors[error].message);
        }
        res.status(400);
        res.json({ message: msgs.join() });
        break; 
      default:
        res.status(500);
        res.json({ message: err.message });
    }
  };
};

module.exports = errorHanlder;
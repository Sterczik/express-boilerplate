'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (passport) {
  passport.use(new _passportLocal.Strategy({ usernameField: 'username' }, function (username, password, done) {
    // Search user
    User.findOne({
      username: username
    }).then(function (user) {
      if (!user) {
        return done(null, false, { message: 'No User Found' });
      }

      // Match password
      _bcryptjs2.default.compare(password, user.password, function (err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        }
        return done(null, false, { message: 'Password incorrect' });
      });

      return false;
    });
  }));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
};

var _passportLocal = require('passport-local');

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _mongoose2.default.model('users');
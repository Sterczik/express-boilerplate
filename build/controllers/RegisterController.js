'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

require('../models/User');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _mongoose2.default.model('users');

exports.default = {
  index: function index(req, res) {
    return res.render('users/register');
  },
  store: function store(req, res) {
    var _req$body = req.body,
        username = _req$body.username,
        password = _req$body.password,
        password2 = _req$body.password2;


    var schema = {
      username: _joi2.default.string().min(4).max(20).required(),
      password: _joi2.default.string().min(6).max(20).required(),
      password2: _joi2.default.string().required().valid(_joi2.default.ref('password')).options({
        language: {
          any: {
            allowOnly: '!!Passwords do not match'
          }
        }
      })
    };
    var validation = _joi2.default.validate(req.body, schema);

    if (validation.error) {
      res.render('users/register', {
        error: validation.error.details[0].message,
        username: username,
        password: password,
        password2: password2
      });
    } else {
      User.findOne({ username: username }).then(function (user) {
        if (user) {
          req.flash('error_msg', 'Username is already taken');
          res.redirect('/users/register');
        } else {
          var newUser = new User({
            username: username,
            password: password
          });

          _bcryptjs2.default.genSalt(10, function (err, salt) {
            _bcryptjs2.default.hash(newUser.password, salt, function (error, hash) {
              if (error) throw error;
              newUser.password = hash;

              newUser.save().then(function () {
                req.flash('success_msg', 'You are now registered and can log in');
                res.redirect('/users/login');
              }).catch(function (e) {});
            });
          });
        }
      }).catch(function (err) {});
    }
  }
};
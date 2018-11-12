'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  index: function index(req, res) {
    return res.render('users/login');
  },
  store: function store(req, res, next) {
    _passport2.default.authenticate('local', {
      successRedirect: '/sentences',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  },
  logout: function logout(req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
  }
};
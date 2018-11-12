'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'Not Authorized');
  res.redirect('/users/login');

  return false;
}

exports.default = ensureAuthenticated;
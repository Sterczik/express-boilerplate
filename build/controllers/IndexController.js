'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../models/User');

exports.default = {
  index: function index(req, res, next) {
    return res.render('index/index');
  },
  about: function about(req, res, next) {
    return res.render('index/about');
  }
};
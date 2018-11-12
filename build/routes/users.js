'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _LoginController = require('../controllers/LoginController');

var _LoginController2 = _interopRequireDefault(_LoginController);

var _RegisterController = require('../controllers/RegisterController');

var _RegisterController2 = _interopRequireDefault(_RegisterController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/login', _LoginController2.default.index);
router.post('/login', _LoginController2.default.store);
router.get('/logout', _LoginController2.default.logout);

router.get('/register', _RegisterController2.default.index);
router.post('/register', _RegisterController2.default.store);

exports.default = router;
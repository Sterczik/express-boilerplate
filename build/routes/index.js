'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _IndexController = require('../controllers/IndexController');

var _IndexController2 = _interopRequireDefault(_IndexController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _IndexController2.default.index);
router.get('/about', _IndexController2.default.about);

exports.default = router;
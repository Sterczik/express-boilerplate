'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _SentenceController = require('../controllers/SentenceController');

var _SentenceController2 = _interopRequireDefault(_SentenceController);

var _auth = require('../helpers/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', _SentenceController2.default.index);
router.get('/user/:userId', _SentenceController2.default.public);
router.get('/my', _auth2.default, _SentenceController2.default.private);
router.get('/add', _auth2.default, _SentenceController2.default.create);
router.post('/add', _auth2.default, _SentenceController2.default.store);
router.get('/edit/:id', _auth2.default, _SentenceController2.default.edit);
router.patch('/edit/:id', _auth2.default, _SentenceController2.default.update);
router.delete('/:id', _auth2.default, _SentenceController2.default.destroy);

exports.default = router;
var express = require('express');
var router = express.Router();

const IndexController = require('../controllers/IndexController');

// Load Layout
// router.all('/*', function (req, res, next) {
//   req.app.locals.layout = 'main';
//   next();
// });

router.get('/', IndexController.index);

module.exports = router;
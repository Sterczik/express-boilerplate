const express = require('express');
const router = express.Router();

const IndexController = require('../controllers/IndexController');

router.get('/', IndexController.index);
router.get('/about', IndexController.about);

module.exports = router;
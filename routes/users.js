const express = require('express');
const router = express.Router();

const LoginController = require('../controllers/LoginController');
const RegisterController = require('../controllers/RegisterController');

router.get('/login', LoginController.index);
router.post('/login', LoginController.store);
router.get('/logout', LoginController.logout);

router.get('/register', RegisterController.index);
router.post('/register', RegisterController.store);

module.exports = router;
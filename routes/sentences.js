const express = require('express');
const router = express.Router();

const SentenceController = require('../controllers/SentenceController');

// Load Helper for Auth
const {ensureAuthenticated} = require('../helpers/auth');

router.get('/', SentenceController.index);
router.get('/add', ensureAuthenticated, SentenceController.create);
router.post('/add', ensureAuthenticated, SentenceController.store);
// get sentence
// post sentence (delete)

module.exports = router;
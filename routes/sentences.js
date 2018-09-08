const express = require('express');
const router = express.Router();

const SentenceController = require('../controllers/SentenceController');

// Load Helper for Auth
const {ensureAuthenticated} = require('../helpers/auth');

router.get('/', SentenceController.index);
router.get('/add', ensureAuthenticated, SentenceController.create);
router.post('/add', ensureAuthenticated, SentenceController.store);
router.get('/edit/{id}', ensureAuthenticated, SentenceController.edit);
router.patch('/edit/{id}', ensureAuthenticated, SentenceController.update);
router.delete('/', ensureAuthenticated, SentenceController.destroy);

module.exports = router;
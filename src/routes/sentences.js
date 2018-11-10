const express = require('express');
const router = express.Router();

const SentenceController = require('../controllers/SentenceController');

const { ensureAuthenticated } = require('../helpers/auth');

router.get('/', SentenceController.index);
router.get('/user/:userId', SentenceController.public);
router.get('/my', ensureAuthenticated, SentenceController.private);
router.get('/add', ensureAuthenticated, SentenceController.create);
router.post('/add', ensureAuthenticated, SentenceController.store);
router.get('/edit/:id', ensureAuthenticated, SentenceController.edit);
router.patch('/edit/:id', ensureAuthenticated, SentenceController.update);
router.delete('/:id', ensureAuthenticated, SentenceController.destroy);

module.exports = router;
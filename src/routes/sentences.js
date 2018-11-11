import express from 'express';
import SentenceController from '../controllers/SentenceController';
import ensureAuthenticated from '../helpers/auth';

const router = express.Router();

router.get('/', SentenceController.index);
router.get('/user/:userId', SentenceController.public);
router.get('/my', ensureAuthenticated, SentenceController.private);
router.get('/add', ensureAuthenticated, SentenceController.create);
router.post('/add', ensureAuthenticated, SentenceController.store);
router.get('/edit/:id', ensureAuthenticated, SentenceController.edit);
router.patch('/edit/:id', ensureAuthenticated, SentenceController.update);
router.delete('/:id', ensureAuthenticated, SentenceController.destroy);

export default router;

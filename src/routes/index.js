import express from 'express';
import IndexController from '../controllers/IndexController';

const router = express.Router();

router.get('/', IndexController.index);
router.get('/about', IndexController.about);

export default router;

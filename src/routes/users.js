import express from 'express';

import LoginController from '../controllers/LoginController';
import RegisterController from '../controllers/RegisterController';

const router = express.Router();

router.get('/login', LoginController.index);
router.post('/login', LoginController.store);
router.get('/logout', LoginController.logout);

router.get('/register', RegisterController.index);
router.post('/register', RegisterController.store);

export default router;

import express from 'express';
import { signup,login, google,signout } from '../controllers/auth.controller.js';

const router = express.Router();

//route the requests to the appropriate controller
router.post('/sign-up', signup);
router.post('/log-in', login);
router.post('/google', google); 
router.get('/signout',signout);

export default router;
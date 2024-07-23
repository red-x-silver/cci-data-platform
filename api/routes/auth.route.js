import express from 'express';
import { signup,login, google } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/sign-up', signup);
router.post('/log-in', login);
router.post('/google', google); 

export default router;
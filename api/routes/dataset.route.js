import express from 'express';
import { createDataset } from '../controllers/dataset.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createDataset);

export default router;
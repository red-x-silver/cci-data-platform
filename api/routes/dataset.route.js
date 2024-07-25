import express from 'express';
import { createDataset,deleteDataset } from '../controllers/dataset.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createDataset);
router.delete('/delete/:id', verifyToken, deleteDataset);

export default router;
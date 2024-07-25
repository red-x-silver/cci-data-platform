import express from 'express';
import { createDataset,deleteDataset, updateDataset,getDataset } from '../controllers/dataset.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken, createDataset);
router.delete('/delete/:id', verifyToken, deleteDataset);
router.post('/update/:id', verifyToken, updateDataset);
router.get('/get/:id', verifyToken, getDataset);

export default router;
import express from 'express';
import { createDataset,deleteDataset, updateDataset,getDataset,getDatasets } from '../controllers/dataset.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

//route the requests to the appropriate controller
router.post('/create', verifyToken, createDataset);
router.delete('/delete/:id', verifyToken, deleteDataset);
router.post('/update/:id', verifyToken, updateDataset);
router.get('/get/:id', getDataset);
router.get('/get', getDatasets);

export default router;
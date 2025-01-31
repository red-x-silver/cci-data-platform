import express from 'express';
import { test, updateUser,deleteUser, getUserDatasets, } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

//route the requests to the appropriate controller
router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser);
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/datasets/:id', verifyToken, getUserDatasets);

export default router;
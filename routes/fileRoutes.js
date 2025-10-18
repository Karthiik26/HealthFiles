import express from 'express';
import { upload } from '../config/cloudinary.js';
import { uploadFile, listFiles, deleteFile } from '../controllers/fileController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post('/upload', isAuthenticated, upload.single('file'), uploadFile);
router.get('/', isAuthenticated, listFiles);
router.delete('/:id', isAuthenticated, deleteFile);

export default router;

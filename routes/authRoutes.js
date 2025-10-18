import express from 'express';
import { signup, login, logout, getProfile, updateProfile } from '../controllers/authController.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { upload } from '../config/cloudinary.js';
 
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

// profile routes: update can have profile image
router.get('/profile', isAuthenticated, getProfile);
router.put('/profile', isAuthenticated, upload.single('profileImage'), updateProfile);

export default router;

import express from 'express';
import {
  getAllUsers,
  signUp,
  logIn,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from '../controllers/UserController';
import { authenticateToken } from '../utils/authenticate';

const router = express.Router();

router.get('/users', authenticateToken, getAllUsers);
router.post('/signup', signUp);
router.post('/login', logIn);
router.put('/verfiy-email', authenticateToken, verifyEmail);
router.put('/forgot-password', forgotPassword);
router.put('/reset-password', resetPassword);

export default router;

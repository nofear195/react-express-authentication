import express from 'express';
import {
  getAllUsers,
  signUp,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from '../controllers/UserController';

const router = express.Router();

router.get('/users', getAllUsers);
router.post('/signup', signUp);
router.post('/login', login);
router.put('/verfiy-email', verifyEmail);
router.put('/forgot-password', forgotPassword);
router.put('/reset-password', resetPassword);

export default router;

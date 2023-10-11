import express from 'express';

import {
  signUp,
  logIn,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from '../controllers/CognitoController';

import { authenticateToken } from '../utils/authenticate';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', logIn);
router.put('/verfiy-email', authenticateToken, verifyEmail);
router.put('/forgot-password', forgotPassword);
router.put('/reset-password', resetPassword);

export default router;

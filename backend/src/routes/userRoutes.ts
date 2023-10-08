import express from 'express';
import { signUp, login, verifyEmail, getAllUsers } from '../controllers/UserController';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.put('/verfiy-email', verifyEmail);

router.get('/', getAllUsers);

export default router;

import express from 'express';
import { signUp, login, getAllUsers } from '../controllers/UserController';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);

router.get('/', getAllUsers);

export default router;

import express from 'express';

import userRoutes from './userRoutes';
import googleOauth2 from './googleOauth2';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/oauth/google', googleOauth2);

export default router;

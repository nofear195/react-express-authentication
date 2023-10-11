import express from 'express';

import userRoutes from './UserRoutes';
import CognitoRoutes from './CognitoRoutes';
import googleOauth2 from './googleOauth2';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/aws/cognito', CognitoRoutes);
router.use('/oauth/google', googleOauth2);

export default router;

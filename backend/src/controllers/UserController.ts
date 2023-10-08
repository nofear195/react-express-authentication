import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { sendResponse, handleInstanceError } from '../utils/helper';
import config from '../utils/config';
import { sendVerifyEmail } from '../services/sendEmail';
import { v4 as uuid } from 'uuid';
import { signJwt } from '../services/authenticate';

const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (user) return sendResponse(res, { code: 409, message: 'user exists' });

  const passwordHash = await bcrypt.hash(password, 10);

  const verificationString = uuid();
  const result = await User.create({
    email,
    password: passwordHash,
    verificationString,
  } as User);
  const { id, isVerified } = result;

  try {
    await sendVerifyEmail(email, 'http://localhost:3000', verificationString);
  } catch (error) {
    handleInstanceError(error, Error, (error) => {
      console.error(error.message);
      return sendResponse(res, { code: 500, message: error.message });
    });
  }

  signJwt(res, {
    id,
    email,
    isVerified,
  });
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  if (!user) return sendResponse(res, { code: 409, message: 'user not found' });

  const { id, isVerified, password: passwordHash } = user;

  const isCorrect = await bcrypt.compare(password, passwordHash);

  if (!isCorrect) return sendResponse(res, { code: 401, message: 'input error' });

  signJwt(res, {
    id,
    email,
    isVerified,
  });
};

const verifyEmail = async (req: Request, res: Response) => {
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  const { verificationString } = req.body;
  const result = await User.findOne({ where: { verificationString } });

  if (!result)
    return sendResponse(res, { code: 409, message: 'The email verification code is incorrect' });

  const { id, email } = result;

  await User.update({ isVerified: true }, { where: { id } });

  signJwt(res, {
    id,
    email,
    isVerified: true,
  });
};

const getAllUsers = async (req: Request, res: Response) => {
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  try {
    const users = await User.findAll();
    sendResponse(res, { data: users });
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { signUp, login, verifyEmail, getAllUsers };

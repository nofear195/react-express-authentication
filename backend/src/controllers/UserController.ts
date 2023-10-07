import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sequelize from '../services/database';
import { User } from '../models/User';
import { sendResponse, handleInstanceError } from '../utils/helper';
import config from '../utils/config';

const userRepository = sequelize.getRepository(User);

const signUp = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userRepository.findOne({ where: { email } });

  if (user) return sendResponse(res, { code: 409, message: 'user exists' });

  const passwordHash = await bcrypt.hash(password, 10);

  const result = await userRepository.create({
    email: email,
    password: passwordHash,
  } as User);
  const { id, isVerified } = result;

  jwt.sign(
    {
      id,
      email,
      isVerified,
    },
    config.JWT_SECRET,
    { expiresIn: '2d' },
    (error, token) => {
      if (error) {
        handleInstanceError(error, Error, (error) => {
          console.error(error.message);
          return sendResponse(res, { code: 500, message: error.message });
        });
      }
      sendResponse(res, { data: token });
    },
  );
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await userRepository.findOne({ where: { email } });

  if (!user) return sendResponse(res, { code: 409, message: 'user not found' });

  const { id, isVerified, password: passwordHash } = user;

  const isCorrect = await bcrypt.compare(password, passwordHash);

  if (!isCorrect) return sendResponse(res, { code: 401, message: 'input error' });

  jwt.sign(
    {
      id,
      email,
      isVerified,
    },
    config.JWT_SECRET,
    { expiresIn: '2d' },
    (error, token) => {
      if (error) {
        handleInstanceError(error, Error, (error) => {
          console.error(error.message);
          return sendResponse(res, { code: 500, message: error.message });
        });
      }
      sendResponse(res, { data: token });
    },
  );
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.findAll();
    sendResponse(res, { data: users });
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { signUp,login, getAllUsers };

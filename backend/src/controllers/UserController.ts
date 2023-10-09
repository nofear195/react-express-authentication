import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { User } from '../models/User';
import { sendResponse, handleAndConvertError } from '../utils/helper';
import { sendVerifyEmail, sendResetPasswordEmail } from '../services/sendEmail';
import { signJwt } from '../services/authenticate';

const getAllUsers = async (req: Request, res: Response) => {
  // #swagger.tags = ['User']
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  try {
    const users = await User.findAll();
    sendResponse(res, { data: users });
  } catch (error) {
    const message = handleAndConvertError(error);
    sendResponse(res, { code: 500, message });
  }
};

const signUp = async (req: Request, res: Response) => {
  // #swagger.tags = ['User']
  const { email, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);
  const verificationString = uuid();
  const redirectUrl = 'http://localhost:3000';

  try {
    const user = await User.findOne({ where: { email } });
    if (user) throw new Error('user exists');

    const result = await User.create({
      email,
      password: passwordHash,
      verificationString,
    } as User);
    const { id, isVerified } = result;

    await sendVerifyEmail(email, redirectUrl, verificationString);

    const token = signJwt({
      id,
      email,
      isVerified,
    });

    sendResponse(res, { data: token });
  } catch (error) {
    const message = handleAndConvertError(error);
    sendResponse(res, { code: 500, message });
  }
};

const login = async (req: Request, res: Response) => {
  // #swagger.tags = ['User']
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('user not found');

    const { id, isVerified, password: passwordHash } = user;

    const isCorrect = await bcrypt.compare(password, passwordHash);
    if (!isCorrect) throw new Error('input error');

    const token = signJwt({
      id,
      email,
      isVerified,
    });

    sendResponse(res, { data: token });
  } catch (error) {
    const message = handleAndConvertError(error);
    sendResponse(res, { code: 500, message });
  }
};

const verifyEmail = async (req: Request, res: Response) => {
  // #swagger.tags = ['User']
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  const { verificationString } = req.body;

  try {
    const user = await User.findOne({ where: { verificationString } });
    if (!user) throw new Error('The email verification code is incorrect');

    const { id, email, isVerified } = user;
    if (isVerified) throw new Error('The email has already been verified');

    const result = await User.update({ isVerified: true }, { where: { id } });

    if (result[0] === 0) throw new Error('database update user verified error');

    const token = signJwt({ id, email, isVerified: true });
    sendResponse(res, { data: token });
  } catch (error) {
    const message = handleAndConvertError(error);
    sendResponse(res, { code: 500, message });
  }
};

const forgotPassword = async (req: Request, res: Response) => {
  // #swagger.tags = ['User']
  const { email } = req.body;
  const verificationString = uuid();
  const redirectUrl = 'http://localhost:3000';

  try {
    const result = await User.update({ verificationString }, { where: { email } });
    if (result[0] === 0) throw new Error('eamil not found');

    await sendResetPasswordEmail(email, redirectUrl, verificationString);

    sendResponse(res);
  } catch (error) {
    const message = handleAndConvertError(error);
    sendResponse(res, { code: 500, message });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  // #swagger.tags = ['User']
  const { passwordResetCode, newPassword } = req.body;

  const newPasswordHash = await bcrypt.hash(newPassword, 10);

  try {
    const result = await User.update(
      { password: newPasswordHash },
      { where: { verificationString: passwordResetCode } },
    );
    if (result[0] === 0) throw new Error('reset password error');

    sendResponse(res);
  } catch (error) {
    const message = handleAndConvertError(error);
    sendResponse(res, { code: 500, message });
  }
};

export { getAllUsers, signUp, login, verifyEmail, forgotPassword, resetPassword };

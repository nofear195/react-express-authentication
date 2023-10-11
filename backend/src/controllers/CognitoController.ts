import { Request, Response } from 'express';

import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  ForgotPasswordCommand,
  ConfirmForgotPasswordCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { awsCognitoConfig as config } from '../utils/config';
import { handleAndConvertError, sendResponse } from '../utils/helper';
import { User } from '../models/User';
import { signJwt } from '../utils/authenticate';

// Configuration
const region = config.aws_region;
const clientId = config.aws_client_id;

// AWS SDK Configuration for Cognito Identity Provider
const identityClient = new CognitoIdentityProviderClient({ region });

const signUp = async (req: Request, res: Response) => {
  // #swagger.tags = ['Amazon Cognito Identity']
  const { username, email, password } = req.body;

  const command = new SignUpCommand({
    ClientId: clientId,
    Username: email,
    Password: password,
    UserAttributes: [
      { Name: 'email', Value: email },
      { Name: 'name', Value: username },
    ],
  });

  try {
    await identityClient.send(command);
    const newUser = await User.create({ email, name: username } as User);
    const { id } = newUser;

    const token = signJwt({ id, email, isVerified: false });
    if (token instanceof Error) throw token;

    sendResponse(res, { data: token });
  } catch (error) {
    const message = handleAndConvertError(error);
    sendResponse(res, { code: 500, message });
  }
};

const verifyEmail = async (req: Request, res: Response) => {
  // #swagger.tags = ['Amazon Cognito Identity']
  /* #swagger.security = [{
            "bearerAuth": []
    }] */
  const { email, confirmationCode } = req.body;

  const command = new ConfirmSignUpCommand({
    ClientId: clientId,
    Username: email,
    ConfirmationCode: confirmationCode,
  });

  try {
    await identityClient.send(command);

    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('user eamil not found');
    const { id } = user;
    const updatedResult = await User.update({ isVerified: true }, { where: { id } });
    if (updatedResult[0] === 0) throw new Error('database update user verified error');
    const token = signJwt({ id, email, isVerified: true });
    if (token instanceof Error) throw token;

    sendResponse(res, { data: token });
  } catch (error) {
    const message = handleAndConvertError(error);
    sendResponse(res, { code: 500, message });
  }
};

const logIn = async (req: Request, res: Response) => {
  // #swagger.tags = ['Amazon Cognito Identity']
  const { email, password } = req.body;
  console.log(email, password);

  const command = new InitiateAuthCommand({
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: clientId,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  });

  try {
    const response = await identityClient.send(command);

    const token = response.AuthenticationResult?.AccessToken;
    if (!token) throw new Error(' user login error');
    sendResponse(res, { data: token });
  } catch (error) {
    const message = handleAndConvertError(error);
    sendResponse(res, { code: 500, message });
  }
};

const forgotPassword = async (req: Request, res: Response) => {
  // #swagger.tags = ['Amazon Cognito Identity']
  const { email } = req.body;

  const command = new ForgotPasswordCommand({
    ClientId: clientId,
    Username: email,
  });

  try {
    await identityClient.send(command);
    sendResponse(res);
  } catch (error) {
    const message = handleAndConvertError(error);
    sendResponse(res, { code: 500, message });
  }
};

const resetPassword = async (req: Request, res: Response) => {
  // #swagger.tags = ['Amazon Cognito Identity']
  const { email, confirmationCode, newPassword } = req.body;

  const command = new ConfirmForgotPasswordCommand({
    ClientId: clientId,
    Username: email,
    ConfirmationCode: confirmationCode,
    Password: newPassword,
  });

  try {
    await identityClient.send(command);
    sendResponse(res);
  } catch (error) {
    const message = handleAndConvertError(error);
    sendResponse(res, { code: 500, message });
  }
};

export { signUp, logIn, verifyEmail, forgotPassword, resetPassword };

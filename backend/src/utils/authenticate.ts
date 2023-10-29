import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { envConfig } from './config';
import { sendResponse } from './helper';

interface JwtPayload {
  id: number;
  email: string;
  isVerified: boolean;
}

const secretKey: string = envConfig.JWT_SECRET;

function signJwt(payload: JwtPayload): string | Error {
  try {
    const token = jwt.sign(payload, secretKey, { expiresIn: '2d' });
    return token;
  } catch (error) {
    return error as Error;
  }
}

function parseJwtToken(req: Request): JwtPayload | Error {
  const { authorization } = req.headers;
  try {
    if (authorization === undefined) throw new Error('Missing token');

    const splitData = authorization.split(' ');
    if (splitData.length !== 2) throw new Error('Invalid format');

    const token = splitData[1];
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    return decoded;
  } catch (error) {
    return error as Error;
  }
}

function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  // For routes not in the excludedRoutes list, perform JWT token validation
  const parseResult = parseJwtToken(req);
  if (parseResult instanceof Error)
    return sendResponse(res, { code: 401, message: parseResult.message });
  next();
}

export { JwtPayload, signJwt, parseJwtToken, authenticateToken };

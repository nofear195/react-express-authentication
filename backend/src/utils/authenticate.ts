import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { envConfig } from './config';
import { sendResponse } from './helper';

function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  // For routes not in the excludedRoutes list, perform JWT token validation
  const { authorization } = req.headers;
  if (authorization === undefined)
    return sendResponse(res, { code: 401, message: 'Unauthorized - Missing token' });

  const token: string = authorization.split(' ')[1] || '';
  if (token === '')
    return sendResponse(res, { code: 401, message: 'Unauthorized - unexpect token' });

  const secretKey: string = envConfig.JWT_SECRET;

  jwt.verify(token, secretKey, async (error: Error | null, decoded: any) => {
    if (error) return sendResponse(res, { code: 401, message: 'Unauthorized - unexpect token' });
    next();
  });
}

interface JwtPayload {
  id: number;
  email: string;
  isVerified: boolean;
}

function signJwt(payload: JwtPayload): string | Error {
  try {
    const token = jwt.sign(payload, envConfig.JWT_SECRET, { expiresIn: '2d' });
    return token;
  } catch (error) {
    return error as Error;
  }
}

export { authenticateToken, signJwt };

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../utils/config';
import { handleInstanceError, sendResponse } from '../utils/helper';

// List of routes that do not require a Bearer token
const excludedRoutes: string[] = ['/api/user/login', '/api/user/signup'];

function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  // Get the requested route path
  const routePath: string = req.path;

  // Check if the route is in the excludedRoutes list
  if (excludedRoutes.includes(routePath)) return next();

  // For routes not in the excludedRoutes list, perform JWT token validation
  const { authorization } = req.headers;
  if (authorization === undefined)
    return sendResponse(res, { code: 401, message: 'unable to verify token' });

  const token: string = authorization.split(' ')[1] || '';
  const secretKey: string = config.JWT_SECRET;

  jwt.verify(token, secretKey, async (error: Error | null, decoded: any) => {
    if (error) return sendResponse(res, { code: 401, message: 'unable to verify token' });
    next();
  });
}

interface JwtPayload {
  id: number;
  email: string;
  isVerified: boolean;
}

function signJwt(res: Response, payload: JwtPayload): void {
  try {
    const token = jwt.sign(payload, config.JWT_SECRET, { expiresIn: '2d' });
    return sendResponse(res, { data: token });
  } catch (error) {
    handleInstanceError(error, Error, (error) => {
      console.error(error.message);
      return sendResponse(res, { code: 500, message: error.message });
    });
  }
}

export { authenticateToken, signJwt };

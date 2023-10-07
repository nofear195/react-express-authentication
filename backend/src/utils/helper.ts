import { Response } from 'express';

function sendResponse(
  res: Response,
  response: Partial<{ code: number; message: string; data?: any }> = {},
): void {
  const { code = 200, message = 'ok', data = null } = response;
  res.status(code).json({ code, message, data });
}

function handleInstanceError<T extends Error>(
  error: any,
  errorType: { new (): T },
  errorHandler: (error: T) => void,
) {
  if (error instanceof errorType) {
    errorHandler(error);
  } else {
    console.error('An unexpected error occurred:', error);
  }
}

export { sendResponse, handleInstanceError };

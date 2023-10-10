import { Response } from 'express';

function sendResponse(
  res: Response,
  response: Partial<{ code: number; message: string; data?: any }> = {},
): void {
  const { code = 200, message = 'ok', data = null } = response;
  res.status(code).json({ code, message, data });
}

function handleAndConvertError(error: any): string {
  if (error instanceof Error) {
    console.error('An expected error occurred:', error.message);
    return error.message;
  } else {
    const errorMessage = error ? error.toString() : 'Unknown error';
    console.error('An unexpected error occurred:', errorMessage);
    return errorMessage; // Return the error message as a string
  }
}

export { sendResponse, handleAndConvertError };

import type { ErrorRequestHandler } from 'express';
import { CustomError } from '@/errors';
import { StatusCodes } from 'http-status-codes';
export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ message: err.message })
    return
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
}
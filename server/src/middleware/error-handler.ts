import type { ErrorRequestHandler, Response } from 'express';
import { CustomError } from '@/errors';
import { StatusCodes } from 'http-status-codes';
import type { Error } from 'mongoose';
const castErrorHandler = (res: Response, err: Error.CastError): void => {
  const message = `Invalid value for ${err.path}: ${err.value}!`
  res.status(StatusCodes.BAD_REQUEST).json({ message })
}

const duplicateKeyErrorHandler = (res: Response): void => {
  const message = `Duplicate key error. This value already exists.`;
  res.status(StatusCodes.BAD_REQUEST).json({ message })
}

const validationErrorHandler = (res: Response, err: Error.ValidationError): void => {
  const errors = Object.values(err.errors).map(val => val.message);
  const errorMessages = errors.join('. ');
  const message = `Invalid input data: ${errorMessages}`;

  res.status(StatusCodes.BAD_REQUEST).json({ message })
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next)  => {
  console.log({err})
  if (err instanceof CustomError) return res.status(err.statusCode).json({ message: err.message })

  /* MONGO ERRORS */
  if(err.name === 'CastError') return castErrorHandler(res, err as Error.CastError)
  if(err.code === 11000) return duplicateKeyErrorHandler(res)
  if(err.name === 'ValidationError') return validationErrorHandler(res, err as Error.ValidationError)

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' })
}
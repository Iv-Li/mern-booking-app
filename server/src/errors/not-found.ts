import CustomError from '@/errors/custom-error';
import { StatusCodes } from 'http-status-codes';

export default class NotFound extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.NOT_FOUND)
  }
}
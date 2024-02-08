import CustomError from '@/errors/custom-error';
import { StatusCodes } from 'http-status-codes';

export default class BadRequest extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST)
  }
}
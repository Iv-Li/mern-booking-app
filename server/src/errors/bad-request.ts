import CustomError from '@/errors/custom-error';
import { StatusCodes } from 'http-status-codes';

export default class BadRequest extends CustomError {
  public statusCode: number
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}
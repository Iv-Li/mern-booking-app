import CustomError from '@/errors/custom-error';
import { StatusCodes } from 'http-status-codes';

export default class Unauthorized extends CustomError {
  constructor(message: string) {
    super(message, StatusCodes.FORBIDDEN)
  }
}
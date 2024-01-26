import { Request } from 'express';
import { validationResult } from 'express-validator';
import { BadRequest } from '@/errors';
export const checkFieldValidation = (req: Request) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let errsMsg = errors.formatWith<string>(err => err.msg).array().join('\n')
    throw new BadRequest(errsMsg)
  }
}

import type { Request } from 'express';
import { validationResult } from 'express-validator';
import { BadRequest } from '@/errors';
export const checkFieldValidation = (req: Request): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errsMsg = errors.formatWith<string>(err => err.msg).array().join('\n')
    throw new BadRequest(errsMsg)
  }
}

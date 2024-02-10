import type { NextFunction, Request, Response } from 'express';
import { Unauthenticated } from '@/errors';
import { isTokenValid, type IUserJWT } from '@/utils/jwt';

declare global {
  namespace Express {
    interface Request {
      user: IUserJWT
    }
  }
}

export const verifyToken = (req: Request, _res: Response, next: NextFunction): void | never => {
  const { token } = req.signedCookies
  if(!token) {
    throw new Unauthenticated('Unauthenticated. Token absent')
  }

  try {
    const payload = isTokenValid(token as string)
    req.user = payload
    next()
  } catch (err) {
    throw new Unauthenticated('Unauthenticated. Invalid token')
  }
}

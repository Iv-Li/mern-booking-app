import jwt, { JwtPayload } from 'jsonwebtoken'
import { Response } from 'express';
import { IUser } from '@/shared/types';

export type IUserJWT = Partial<Omit<IUser, 'password' | '_id'>>
export const createJWT = ({ payload }: { payload: JwtPayload }): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_LONG})
}

export const isTokenValid = (token: string): JwtPayload | string => {
  return jwt.verify(token, process.env.JWT_SECRET as string)
}

export const attachCookieToResponse = ({ res, user }: { res: Response, user: IUserJWT }) => {
  const accessToken = createJWT({ payload: user })
  const oneDay = 1000 * 60 * 60 * 24

  res.cookie('token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'prod',
    maxAge: oneDay,
    signed: true
  })
}

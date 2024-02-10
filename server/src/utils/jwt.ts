import jwt, { type JwtPayload } from 'jsonwebtoken'
import { type Response } from 'express';
import type { IUser } from '@/shared/types/types';

export type UserJWT = Pick<IUser, 'firstName' | 'lastName' | '_id' | 'email'>
export interface IUserJWT extends JwtPayload, UserJWT {}
export const createJWT = ({ payload }: { payload: IUserJWT }): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_LONG})
}

export const isTokenValid = (token: string): IUserJWT => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as IUserJWT
}

export const attachCookieToResponse = ({ res, user }: { res: Response, user: IUserJWT }): void => {
  const accessToken = createJWT({ payload: user })
  const oneDay = 1000 * 60 * 60 * 24

  res.cookie('token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'prod',
    maxAge: oneDay,
    signed: true
  })
}

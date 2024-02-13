import type { Response, Request } from 'express';
import { StatusCodes } from 'http-status-codes';
import { BadRequest, Unauthenticated } from '@/errors';
import { User, PreValidateUser, Token } from '@/models';
import { checkFieldValidation, jwt, sendVerifyEmail, sendResetEmail } from '@/utils';
import type { TypedRequestBody, IUser } from '@/shared/types/types';
import type { IForgetPassword, ILogout, IUserRes, IResetPasswordReq } from '@/shared/types';
import crypto from 'crypto';

const register = async (req: TypedRequestBody<IUser>, res: Response): Promise<void | never> => {
  checkFieldValidation(req)

  const { email } = req.body

  const isEmailExisted = await User.findOne({ email })

  if(isEmailExisted) {
    throw new BadRequest(`Duplicate value: ${email} already exists`)
  }

  const user = await User.create({...req.body})

  const verificationToken = crypto.randomBytes(64).toString('hex')
  await PreValidateUser.create({ user: user._id, verificationToken })
  await sendVerifyEmail({ email, verificationToken, origin: process.env.CLIENT_URL as string })

  res.status(StatusCodes.OK).json({ success: 'success', message: 'Check email to verify the account' })
}

const verifyEmail = async (req: TypedRequestBody<{email: string, verificationToken: string}>, res: Response): Promise<void> | never => {
  const { email, verificationToken } = req.body
  const user = await User.findOne({ email })
  const prevalidateUser = await PreValidateUser.findOne({ user })

  if(!user || !prevalidateUser || (prevalidateUser?.verificationToken !== verificationToken)) {
    throw new Unauthenticated(`Verification failed`)
  }

  prevalidateUser.isValidated = true
  await prevalidateUser.save()

  const { password: _p, ...rest} = user.toObject()
  const userData = { firstName: rest.firstName, lastName: rest.lastName, email: rest.email, _id: rest._id }
  jwt.attachCookieToResponse({ res, user: userData })

  res.status(StatusCodes.OK).json({ success: 'success', data: rest })

}

const login = async (req: TypedRequestBody<IUser>, res: Response): Promise<void | never> => {
  checkFieldValidation(req)

  const { email, password } = req.body
  const user = await User.findOne({ email })
  if(!user) {
    throw new BadRequest(`Invalid Credentials`)
  }

  const isPasswordMatched = await user.comparePassword(password)
  if(!isPasswordMatched) {
    throw new BadRequest(`Invalid Credentials`)
  }

  const { password: _p, ...rest} = user.toObject()
  const userData = { firstName: rest.firstName, lastName: rest.lastName, email: rest.email, _id: rest._id }
  jwt.attachCookieToResponse({ res, user: userData })

  res.status(StatusCodes.OK).json({ success: 'success', data: rest })
}


const logout = (_req: Request, res: Response<ILogout>): void => {
  res.cookie('token', '', {
    expires: new Date(0)
  })
  res.status(StatusCodes.OK).json({ message: 'success', data: undefined })
}

const validateToken =(req: Request, res: Response<IUserRes>): void => {
  res.status(StatusCodes.OK).json({ message: 'success', data: req.user })
}

const forgotPassword = async (req: TypedRequestBody<{ email: string }>, res: Response<IForgetPassword>): Promise<void> | never => {
  const { email } = req.body
  console.log({ email })
  const user = await User.findOne({ email })

  if (!user) {
    throw new Unauthenticated(`User with email ${email} not found`)
  }

  const token = await Token.findOne({ user })
  if (token) {
    await token.deleteOne()
  }

  const passwordToken = crypto.randomBytes(70).toString('hex')
  await Token.create({ passwordToken, user: user._id })

  await sendResetEmail({ email, token: passwordToken, origin: process.env.CLIENT_URL as string })
  res.status(StatusCodes.OK).json({ message: "success", data: 'Check email fot reset link'})
}

const resetPassword = async (req: TypedRequestBody<IResetPasswordReq>, res: Response<IUserRes>): Promise<void> => {
  const { email, token, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    throw new Unauthenticated(`User with email ${email} not found`)
  }
  const passToken = await Token.findOne({ user: user._id })

  const isTokenExpired = !passToken || new Date() > passToken.expireAt
  if(isTokenExpired) {
    throw new Unauthenticated(`Token expired`)
  }

  const isTokenVerified = passToken?.passwordToken !== token
  if(isTokenVerified) {
    throw new Unauthenticated(`Token is not valid`)
  }

  user.password = password
  await user.save()

  const { password: pass, ...rest} = user.toObject()
  res.status(StatusCodes.OK).json({ message: "success", data: rest })
}


export {
  register,
  verifyEmail,
  login,
  logout,
  validateToken,
  forgotPassword,
  resetPassword,
}
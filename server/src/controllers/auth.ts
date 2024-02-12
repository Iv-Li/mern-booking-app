import type { Response, Request } from 'express';
import { type ValidationChain } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { BadRequest, Unauthenticated } from '@/errors';
import { User, PreValidateUser } from '@/models';
import { checkFieldValidation, jwt, validators } from '@/utils';
import type { TypedRequestBody, IUser } from '@/shared/types/types';
import type { ILogout, IUserRes } from '@/shared/types';
import crypto from 'crypto';
import { sendVerifyEmail } from '@/utils/sendVerifyEmail';
const { firstNameValidator, lastNameValidator, emailValidator, passwordValidator, verificationTokenValidator } = validators

const registerValidation = (): ValidationChain[] =>
  ([
    firstNameValidator(),
    lastNameValidator(),
    emailValidator(),
    passwordValidator()
  ])
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

const verifyEmailValidator = (): ValidationChain[] =>
  ([
    emailValidator(),
    verificationTokenValidator()
  ])
const verifyEmail = async (req: TypedRequestBody<{email: string, verificationToken: string}>, res: Response): Promise<void> | never => {
  const { email, verificationToken } = req.body
  const user = await User.findOne({ email })
  const prevalidateUser = await PreValidateUser.findOne({ user })

  if(!user || (prevalidateUser?.verificationToken !== verificationToken)) {
    throw new Unauthenticated(`Verification failed`)
  }

  prevalidateUser.isValidated = true
  await prevalidateUser.save()

  const { password: _p, ...rest} = user.toObject()
  const userData = { firstName: rest.firstName, lastName: rest.lastName, email: rest.email, _id: rest._id }
  jwt.attachCookieToResponse({ res, user: userData })

  res.status(StatusCodes.OK).json({ success: 'success', data: rest })

}


const loginValidation = (): ValidationChain[] => ([
  emailValidator(),
  passwordValidator()
])

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


export {
  register,
  verifyEmail,
  verifyEmailValidator,
  registerValidation,
  login,
  loginValidation,
  logout,
  validateToken
}
import type { Response, Request } from 'express';
import { type ValidationChain } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { BadRequest } from '@/errors';
import { User } from '@/models';
import { checkFieldValidation, jwt, validators } from '@/utils';
import type { TypedRequestBody, IUser } from '@/shared/types/types';
import { ILogout, IUserRes } from '@/shared/types';
const { firstNameValidator, lastNameValidator, emailValidator, passwordValidator } = validators

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
  registerValidation,
  login,
  loginValidation,
  logout,
  validateToken
}
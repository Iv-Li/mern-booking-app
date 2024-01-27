import { Request, Response } from 'express';
import { type ValidationChain } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { BadRequest } from '@/errors';
import { User } from '@/models';
import { checkFieldValidation, jwt, validators } from '@/utils';
const { firstNameValidator, lastNameValidator, emailValidator, passwordValidator } = validators

const registerValidation = (): ValidationChain[] =>
  ([
    firstNameValidator(),
    lastNameValidator(),
    emailValidator(),
    passwordValidator()
  ])
const register = async (req: Request, res: Response) => {
  checkFieldValidation(req)

  const { email } = req.body

  const isEmailExisted = await User.findOne({ email })

  if(isEmailExisted) {
    throw new BadRequest(`Duplicate value: ${email} already exists`)
  }

  const user = await User.create({...req.body})
  const { password: _p, ...rest} = user.toObject()

  const userData = { firstName: rest.firstName, lastName: rest.lastName, email: rest.email }
  jwt.attachCookieToResponse({ res, user: userData })

  res.status(StatusCodes.OK).json({ success: 'success', data: rest })
}


const loginValidation = () => ([
  emailValidator(),
  passwordValidator()
])

const login = async (req: Request, res: Response) => {
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
  const userData = { firstName: rest.firstName, lastName: rest.lastName, email: rest.email }
  jwt.attachCookieToResponse({ res, user: userData })

  res.status(StatusCodes.OK).json({ success: 'success', data: rest })
}


export {
  register,
  registerValidation,
  login,
  loginValidation
}
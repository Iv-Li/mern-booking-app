import { Request, Response } from 'express';
import { check, type ValidationChain } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { BadRequest } from '@/errors';
import { User } from '@/models';
import { checkFieldValidation, jwt } from '@/utils';

const registerValidation = (): ValidationChain[] =>
  ([
    check('firstName')
      .isString().withMessage('First name should be a string')
      .isLength({ min: 3, max: 50 }).withMessage('First name should be between 3 and 50 characters'),

    check('lastName')
      .isString().withMessage('Last name should be a string')
      .isLength({ min: 3, max: 50 }).withMessage('Last name should be between 3 and 50 characters'),

    check('email')
      .isEmail().withMessage('Invalid email address'),

    check('password')
      .isString().withMessage('Password should be a string')
      .notEmpty().withMessage('Password should not be empty')
      .isLength({ min: 6 }).withMessage('Password should be at least 6 characters long'),
  ])
const register = async (req: Request, res: Response) => {
  checkFieldValidation(req)

  const { email } = req.body

  const isEmailExisted = await User.findOne({ email })

  if(isEmailExisted) {
    throw new BadRequest(`Duplicate value: ${email} already exists`)
  }

  const user = await User.create({...req.body})
  const { _id, password: _p, ...rest} = user.toObject()

  const userData = { firstName: rest.firstName, lastName: rest.lastName, email: rest.email }
  jwt.attachCookieToResponse({ res, user: userData })

  res.status(StatusCodes.OK).json({ success: 'success', data: rest })
}


export {
  register,
  registerValidation
}
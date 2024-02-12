import { check, type ValidationChain } from 'express-validator';


export const firstNameValidator = (): ValidationChain => {
  return check('firstName')
    .isString().withMessage('First name should be a string')
    .isLength({ min: 3, max: 50 }).withMessage('First name should be between 3 and 50 characters')
}

export const lastNameValidator = (): ValidationChain => {
  return check('lastName')
    .isString().withMessage('Last name should be a string')
    .isLength({ min: 3, max: 50 }).withMessage('Last name should be between 3 and 50 characters')
}

export const emailValidator = (): ValidationChain => {
  return check('email')
    .isEmail().withMessage('Invalid email address')
}

export const passwordValidator = (): ValidationChain => {
  return check('password')
    .isString().withMessage('Password should be a string')
    .notEmpty().withMessage('Password should not be empty')
    .isLength({ min: 6 }).withMessage('Password should be at least 6 characters long')
}

export const verificationTokenValidator = (): ValidationChain => {
  return check('verificationToken')
    .isString().withMessage('First name should be a string')
}




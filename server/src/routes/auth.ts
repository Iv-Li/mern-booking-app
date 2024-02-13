import express from 'express'
import {
  registerValidation,
  verifyEmailValidator,
  loginValidation,
  resetPasswordValidator,
  forgotPasswordValidator
} from '@/utils/validators';

import {
  register,
  verifyEmail,
  login,
  logout,
  validateToken,
  forgotPassword,
  resetPassword
} from '@/controllers/auth';
import { verifyToken } from '@/middleware';

const router = express.Router()

router.route('/register').post(registerValidation(), register)
router.route('/verify-email').post(verifyEmailValidator(), verifyEmail)
router.route('/login').post(loginValidation(), login)
router.route('/logout').post(logout)
router.route('/validate-token').get(verifyToken, validateToken)
router.route('/forgot-password').post(forgotPasswordValidator(), forgotPassword)
router.route('/reset-password').post(resetPasswordValidator(), resetPassword)

export default router
import express from 'express'
import { register, registerValidation, loginValidation, login, logout, validateToken } from '@/controllers/auth';
import { verifyToken } from '@/middleware';

const router = express.Router()

router.route('/register').post(registerValidation(), register)
router.route('/login').post(loginValidation(), login)
router.route('/logout').post(logout)
router.route('/validate-token').get(verifyToken, validateToken)

export default router
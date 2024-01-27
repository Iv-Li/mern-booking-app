import express from 'express'
import { register, registerValidation, loginValidation, login } from '@/controllers/auth';

const router = express.Router()

router.route('/register').post(registerValidation(), register)
router.route('/login').post(loginValidation(), login)

export default router
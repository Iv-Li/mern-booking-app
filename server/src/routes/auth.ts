import express from 'express'
const router = express.Router()


import { register, registerValidation, loginValidation, login } from '@/controllers/auth';

router.route('/register').post(registerValidation(), register)
router.route('/login').post(loginValidation(), login)

export default router
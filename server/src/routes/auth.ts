import express from 'express'
const router = express.Router()


import { register, registerValidation } from '@/controllers/auth';

router.route('/register').post(registerValidation(), register)

export default router
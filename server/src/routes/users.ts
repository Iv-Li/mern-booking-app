import express from 'express';
import { getCurrentUser } from '@/controllers/users';
import { verifyToken } from '@/middleware';
const router = express.Router()

router.route('/me').get(verifyToken, getCurrentUser)

export default router
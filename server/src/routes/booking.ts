import express from 'express';
import { addBooking, getAllGuestBooking, getAllHostBooking } from '@/controllers/booking';
import { verifyToken } from '@/middleware';

const router = express.Router()

router.route('/guest')
  .get(verifyToken, getAllGuestBooking)
  .post(verifyToken, addBooking)

router.route('/host')
  .get(verifyToken, getAllHostBooking)

export default router
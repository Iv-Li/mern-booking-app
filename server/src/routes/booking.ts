import express from 'express';
import { addBooking, getAllMyBooking, getAllUserBooking } from '@/controllers/booking';
import { verifyToken } from '@/middleware';

const router = express.Router()

router.route('/')
  .get(verifyToken, getAllUserBooking)
  .post(verifyToken, addBooking)

router.route('/my')
  .get(verifyToken, getAllMyBooking)

export default router
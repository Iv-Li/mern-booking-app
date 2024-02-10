import express from 'express';
import { searchHotel, getOneHotel } from '@/controllers/hotels';
import { verifyToken } from '@/middleware';

const router = express.Router()

router.route('/:hotelId')
  .get(verifyToken, getOneHotel)

router.route('/search')
  .get(searchHotel)

export default router
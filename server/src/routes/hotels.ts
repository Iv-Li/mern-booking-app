import express from 'express';
import { searchHotel } from '@/controllers/hotels';

const router = express.Router()

router.route('/search')
  .get(searchHotel)

export default router
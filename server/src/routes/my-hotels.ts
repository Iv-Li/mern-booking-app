import express from 'express';
import { verifyToken } from '@/middleware';
import { checkMyHotelFields, getAllMyHotels, addMyHotel, editMyHotel } from '@/controllers/my-hotels';
import { uploadFilesMiddleware } from '@/utils/uploadFiles';

const router = express.Router()

router.route('/')
  .get(verifyToken, getAllMyHotels)
  .post([verifyToken, ...checkMyHotelFields(), uploadFilesMiddleware()], addMyHotel)

router.route('/:hotelId')
  .patch([verifyToken, ...checkMyHotelFields(), uploadFilesMiddleware()], editMyHotel)


export default router
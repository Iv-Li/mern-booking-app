import express from 'express';
import { verifyToken } from '@/middleware';
import { checkMyHotelFields, getAllMyHotels, addMyHotel } from '@/controllers/my-hotels';
import { uploadFilesMiddleware } from '@/utils/uploadFiles';

const router = express.Router()

router.route('/')
  .get(verifyToken, getAllMyHotels)
  .post([checkMyHotelFields, uploadFilesMiddleware()], addMyHotel)


export default router
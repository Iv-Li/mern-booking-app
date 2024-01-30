import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Hotel } from '@/models';
import { NotFound } from '@/errors';
import { body } from 'express-validator';
import type { IHotel } from '@/shared/types';
import { uploadImagesToCloud } from '@/utils/uploadFiles';
const getAllMyHotels = async (req: Request, res: Response): Promise<void>  => {
  try {
    const { _id } = req.user
    const hotels = await Hotel.find({ userId: _id })

    res.status(StatusCodes.OK).json({ message: 'success', data: hotels })
  } catch (err) {
    throw new NotFound('Hotels not found')
  }
}


const checkMyHotelFields = () => ([
  body("name").notEmpty().withMessage("Name is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("type").notEmpty().withMessage("Hotel type is required"),
  body("pricePerNight")
    .notEmpty()
    .isNumeric()
    .withMessage("Price per night is required and must be a number"),
  body("facilities")
    .notEmpty()
    .isArray()
    .withMessage("Facilities are required"),
])

const addMyHotel = async (req: Request, res: Response) => {
  const myHotel: IHotel = req.body

  const files = req.files as Express.Multer.File[]
  const imgUrls = await uploadImagesToCloud(files)

  myHotel.imageUrls = imgUrls

  const hotel = await Hotel.create(myHotel)
  res.status(StatusCodes.CREATED).json({ message: 'success', data: hotel })

}

/*const editMyHotel = (req: Request, res: Response) => {

}*/

export {
  getAllMyHotels,
  checkMyHotelFields,
  addMyHotel
}
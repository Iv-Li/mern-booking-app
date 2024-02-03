import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Hotel } from '@/models';
import { NotFound } from '@/errors';
import { body, type ValidationChain } from 'express-validator';
import type { IHotel } from '@/shared/types/types';
import { uploadImagesToCloud } from '@/utils/uploadFiles';
import type { IMyHotelDetailsRes, MyHotelsRes } from '@/shared/types';
import { convertedHotelsWithTimestamp, convertOneHotelWithTimestamp } from '@/utils';
const getAllMyHotels = async (req: Request, res: Response<MyHotelsRes>): Promise<void>  => {
  try {
    const { _id } = req.user
    const hotels = await Hotel.find({ userId: _id }).lean<IHotel[]>()

    res.status(StatusCodes.OK).json({ message: 'success', data: convertedHotelsWithTimestamp(hotels) })
  } catch (err) {
    throw new NotFound('Hotels not found')
  }
}


const checkMyHotelFields = (): ValidationChain[] => ([
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

const addMyHotel = async (req: Request, res: Response<IMyHotelDetailsRes>): Promise<void> => {
  const { _id: userId } = req.user

  const myHotel: IHotel = req.body

  const files = req.files as Express.Multer.File[]
  const imgUrls = await uploadImagesToCloud(files)

  myHotel.imageUrls = imgUrls
  myHotel.userId = userId
  myHotel.lastUpdated = new Date()

  const hotel = await Hotel.create(myHotel)

  res.status(StatusCodes.CREATED).json({ message: 'success', data: convertOneHotelWithTimestamp(hotel)  })

}

const getOneMyHotel = async (req: Request, res: Response<IMyHotelDetailsRes>): Promise<void> => {
  const { hotelId } = req.params
  const { _id: userId } = req.user

  const hotel = await Hotel.findOne<IHotel>({ _id: hotelId, userId })

  if(!hotelId || !hotel) {
    throw new NotFound('Hotel not found')
  }

  res.status(StatusCodes.OK).json({ message: 'success', data: convertOneHotelWithTimestamp(hotel) })
}
const editMyHotel = async (req: Request, res: Response): Promise<void> => {
  const { hotelId } = req.params
  const { _id } = req.user
  const updatedHotel: IHotel = req.body
  updatedHotel.lastUpdated = new Date()

  const myHotel = await Hotel.findOneAndUpdate(
    { _id: hotelId, userId: _id },
    { $set: updatedHotel },
    {new: true}
    )

  if(!myHotel) {
    throw new NotFound('Hotel not found')
  }

  const files = req.files as Express.Multer.File[]
  const imgUrls = await uploadImagesToCloud(files)

  myHotel.imageUrls = [
    ...imgUrls,
    ...(myHotel?.imageUrls || [])
  ]

  const hotel = convertOneHotelWithTimestamp(await myHotel.save())

  res.status(StatusCodes.OK).json({ message: 'success', data: hotel })
}

export {
  getAllMyHotels,
  checkMyHotelFields,
  addMyHotel,
  getOneMyHotel,
  editMyHotel
}
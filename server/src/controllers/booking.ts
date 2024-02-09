import type { Request, Response } from 'express';
import type { IAllUserBookingRes, IBooking, IBookingRes, IUserHotelWithBooking } from '@/shared/types';
import { Booking, Hotel } from '@/models';
import { BadRequest, NotFound } from '@/errors';
import { StatusCodes } from 'http-status-codes';
import { Types } from 'mongoose';
export const addBooking = async (req: Request<{}, IBooking>, res: Response<IBookingRes>): Promise<void | never> => {
  const userId  = new Types.ObjectId(req.user._id)
  const bookingReq = { ...req.body, userId }

  const existedHotel = await Hotel.findById(bookingReq.hotelId)
  if (!existedHotel) {
    throw new NotFound(`Hotel with id ${bookingReq.hotelId} not found`)
  }

  const booking = await Booking.create(bookingReq)

  if(!booking) {
    throw new BadRequest('Error creating booking')
  }

  existedHotel.bookings.push(booking._id)
  await existedHotel.save()

  res.status(StatusCodes.CREATED).json({ data: booking, message: 'success' })
}

export const getAllGuestBooking = async (req: Request, res: Response<IAllUserBookingRes>): Promise<void> => {
  const { _id } = req.user
  const userId = new Types.ObjectId(_id)
  const existedHotel = await Booking.aggregate<IUserHotelWithBooking>([
    { $match: {  userId }},
    {
      $lookup: {
        from: "hotels",
        localField: "hotelId",
        foreignField: "_id",
        as: "hotel",
      },
    },
    { $unwind: "$hotel" },
    {
      $group: {
        _id: "$hotel._id",
        hotel: { $first: "$hotel" },
        bookings: { $push: "$$ROOT" },
      },
    }
  ])

  if (!existedHotel) {
    throw new NotFound(`No bookings found`)
  }

  res.status(StatusCodes.CREATED).json({ data: existedHotel, message: 'success' })
}


export const getAllHostBooking = async (req: Request, res: Response<IAllUserBookingRes>): Promise<void> => {
  const { _id } = req.user
  const userId = new Types.ObjectId(_id)
  const existedHotel = await Hotel.aggregate<IUserHotelWithBooking>([
    { $match: {  userId }},
    { $unwind: "$bookings" },
    {
      $lookup: {
        from: "bookings",
        localField: "bookings",
        foreignField: "_id",
        as: "bookings",
      },
    },
    { $unwind: "$bookings" },
    {
      $group: {
        _id: "$hotel._id",
        hotel: { $first: "$$ROOT" },
        bookings: { $push: "$bookings" },
      },
    },
    { $project: { "hotel.bookings": 0  }}
  ])

  if (!existedHotel) {
    throw new NotFound(`No bookings found`)
  }

  res.status(StatusCodes.CREATED).json({ data: existedHotel, message: 'success' })
}
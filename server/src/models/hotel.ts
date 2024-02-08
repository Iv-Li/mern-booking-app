import mongoose from 'mongoose';
import { type IHotel, EModels } from '@/shared/types';
import { hotelFacilities, hotelTypes } from '@/shared/consts';

const HotelSchema = new mongoose.Schema<IHotel>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: EModels.USER,
    required: true
  },
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  type: {
    type: String,
    enum: {
      values: hotelTypes,
      message: '{VALUE} is not supported'
    },
    required: [true, 'Type should be provided']
  },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  facilities: {
    type: [{
      type: String,
      enum: {
        values: hotelFacilities,
        message: '{VALUE} is not supported'
      },
    }],
    required: [true, 'Facilities should be provided']
    },
  pricePerNight: { type: Number, required: true },
  starRating: { type: Number, required: true, min: 1, max: 5 },
  imageUrls: [{ type: String, required: true }],
  lastUpdated: { type: Date, required: true },
  bookings: [{ type: mongoose.Types.ObjectId, ref: 'Booking' }],

})


export const Hotel = mongoose.model<IHotel>(EModels.HOTEL, HotelSchema)
import mongoose from 'mongoose';
import { type IBooking, EModels } from '@/shared/types';

const bookingSchema = new mongoose.Schema<IBooking>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: EModels.USER,
    required: [true, 'User should be provided']
  },
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: EModels.HOTEL,
    required: [true, 'Hotel should be provided']
  },
  totalCost: { type: Number, required: true },
})

export const Booking = mongoose.model<IBooking>(EModels.BOOKING, bookingSchema)
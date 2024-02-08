import type { IHotel, IUser, IBooking } from '@/shared/types/types';

export interface ResMessage {
  message: 'success' | 'failed'
}
export interface IHotelRes extends Omit<IHotel, 'lastUpdated'> {
  lastUpdated: number
}
export interface IHotelSearchRes extends ResMessage{
  data: IHotelRes[],
  pagination: {
    total: number,
    page: number,
    pages: number
  }
}

export interface MyHotelsRes extends ResMessage {
  data: IHotelRes[]
}

export interface IMyHotelDetailsRes extends ResMessage {
  data: IHotelRes
}

export interface IUserRes extends ResMessage {
  data: IUser
}

export interface IBookingRes extends ResMessage {
  data: IBooking
}

export interface IUserHotelWithBooking {
  _id: string
  hotel: IHotel
  booking: IBooking[]
}
export interface IAllUserBookingRes extends ResMessage {
  data: IUserHotelWithBooking[]
}
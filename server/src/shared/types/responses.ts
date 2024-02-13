import type { IHotel, IUser, IBooking } from '@/shared/types/types';

export interface ResMessage {
  message: 'success' | 'failed'
}

export interface ILogout extends ResMessage {
  data: undefined
}

export interface IForgetPassword extends ResMessage {
  data: string
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

export type UserType = Omit<IUser, 'password'>
export interface IUserRes extends ResMessage {
  data: UserType
}

export interface IBookingRes extends ResMessage {
  data: IBooking
}

export interface IUserHotelWithBooking {
  _id: string
  hotel: IHotel
  bookings: IBooking[]
}
export interface IAllUserBookingRes extends ResMessage {
  data: IUserHotelWithBooking[]
}

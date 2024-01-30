import { type Model } from 'mongoose';
import { type Request } from 'express';
interface IUser {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
}


interface IUserMethods {
  comparePassword(comparePassword: string): Promise<boolean>
}

// eslint-disable-next-line @typescript-eslint/ban-types
type IUserModel = Model<IUser, {}, IUserMethods>

interface TypedRequestBody<T> extends Request {
  body: T
}

interface IHotel {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
  bookings: IBooking[];
}

interface IBooking {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
}

export type {
  IUser, IUserMethods, IUserModel,
  TypedRequestBody,
  IHotel, IBooking
}
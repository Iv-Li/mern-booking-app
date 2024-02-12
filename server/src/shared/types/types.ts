import type { Model, Types } from 'mongoose';
import { type Request } from 'express';
interface IUser {
  _id: Types.ObjectId
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

interface IPreValidateUser {
  _id: Types.ObjectId
  user: Types.ObjectId
  expireAt: Date
  isValidated: boolean
  verificationToken: string
}

interface IToken {
  _id: Types.ObjectId
  user: Types.ObjectId
  expireAt: Date
  passwordToken: string
}

interface TypedRequestBody<T> extends Request {
  body: T
}

type HotelTypes =
  | 'Budget'
  | 'Boutique'
  | 'Luxury'
  | 'Ski Resort'
  | 'Business'
  | 'Family'
  |'Romantic'
  | 'Hiking Resort'
  | 'Cabin'
  | 'Beach Resort'
  | 'Golf Resort'
  | 'Motel'
  | 'All Inclusive'
  | 'Pet Friendly'
  | 'Self Catering'

type HotelFacilities =
  'Free WiFi'
  | 'Parking'
  | 'Airport Shuttle'
  | 'Family Rooms'
  | 'Non-Smoking Rooms'
  | 'Outdoor Pool'
  | 'Spa'
  | 'Fitness Center'

interface IHotel {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  name: string;
  city: string;
  country: string;
  description: string;
  type: HotelTypes;
  adultCount: number;
  childCount: number;
  facilities: HotelFacilities[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
  bookings: Types.ObjectId[];
}

interface IBooking {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
  hotelId: Types.ObjectId;
}

type SearchQueries = 'destination' | 'adultCount' | 'childCount' | 'facilities' | 'types' | 'stars' | 'maxPrice' | 'page'
type SortingOptions = 'starRating' | 'pricePerNightAsc' | 'pricePerNightDesc'

type SearchQueryMap = {
  [K in SearchQueries]: string
} & {
  sortOption?: SortingOptions
}

export type {
  HotelFacilities, HotelTypes,
  IUser, IUserMethods, IUserModel, IPreValidateUser,
  TypedRequestBody,
  IHotel, IBooking,
  SearchQueryMap, SortingOptions,
  IToken
}

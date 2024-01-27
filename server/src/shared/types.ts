import { type Model } from 'mongoose';
import { type Request } from 'express';
interface IUser {
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

export type {
  IUser, IUserMethods, IUserModel,
  TypedRequestBody
}
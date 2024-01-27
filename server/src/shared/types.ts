import { Model } from 'mongoose';
interface IUser {
  firstName: string
  lastName: string
  email: string
  password: string
}


interface IUserMethods {
  comparePassword(comparePassword: string): Promise<boolean>
}

type IUserModel = Model<IUser, {}, IUserMethods>

export {
  IUser, IUserMethods, IUserModel
}
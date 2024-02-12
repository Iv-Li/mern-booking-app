import mongoose, { type Types } from 'mongoose';
import type { IUser, IUserMethods, IUserModel } from '@/shared/types/types';
import validator from 'validator';
import bcrypt from 'bcrypt'
import { EModels } from '@/shared/types';

const UserSchema = new mongoose.Schema<IUser, IUserModel, IUserMethods>({
  firstName: {
    type: String,
    require: [true, 'First name should be provided'],
    minLength: 3,
    maxLength: 50,
  },
  lastName: {
    type: String,
    require: [true, 'Last name should be provided'],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email should be provided'],
    validate: {
      validator: (val: string) => validator.isEmail(val),
      message: ({ value }) => `${value} is not a valid email`
    },
  },
  password: {
    type: String,
    required: [true, 'Password should be provided']
  },
})

UserSchema.pre('save', async function (){
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

async function deleteRelatedDoc (user: Types.ObjectId): Promise<void>  {
  await mongoose.model(EModels.PRE_VALIDATE_USER).findByIdAndDelete(user);
  await mongoose.model(EModels.TOKEN).findByIdAndDelete(user);
}

UserSchema.pre<IUser>('deleteOne', async function (next){
  await deleteRelatedDoc(this._id)
  next()
})

UserSchema.pre<IUser>('deleteMany', async function (next){
  await deleteRelatedDoc(this._id)
  next()
})

UserSchema.methods.comparePassword = async function (comparedPassword: string): Promise<boolean> {
  const isMatched = await bcrypt.compare(comparedPassword, this.password)
  return isMatched
}


export const User = mongoose.model<IUser, IUserModel>('User', UserSchema)
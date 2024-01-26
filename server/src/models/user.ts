import mongoose from 'mongoose';
import type { IUser } from '@/shared/types';
import validator from 'validator';
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema<IUser>({
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
  }
})

UserSchema.pre('save', async function (){
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})


export const User = mongoose.model<IUser>('User', UserSchema)
import mongoose from 'mongoose';
import type { IPreValidateUser } from '@/shared/types/types';
import { EModels } from '@/shared/types';

const PreValidateUserSchema = new mongoose.Schema<IPreValidateUser>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '1d' },
  },
  isValidated: {
    type: Boolean,
    required: true,
    default: false
  }
})

PreValidateUserSchema.pre<IPreValidateUser>(
  'deleteOne',
  { document: true, query: false },
  async function (next){
  if(this.isValidated) {
    next()
  } else {
    if (this.user) {
      await mongoose.model('User').findByIdAndDelete(this.user);
    }
    next();
  }
})


export const PreValidateUser = mongoose.model<IPreValidateUser>(EModels.PRE_VALIDATE_USER, PreValidateUserSchema)
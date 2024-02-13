import mongoose from 'mongoose';
import type { IToken } from '@/shared/types/types';
import { EModels } from '@/shared/types';
import { oneDay } from '@/consts';

const TokenSchema = new mongoose.Schema<IToken>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  expireAt: {
    type: Date,
    default: Date.now() + oneDay,
    index: { expires: '1h' },
  },
  passwordToken: {
    type: String,
    required: true
  },
})
export const Token = mongoose.model<IToken>(EModels.TOKEN, TokenSchema)
import type { Request, Response } from 'express';
import { User } from '@/models';
import { NotFound } from '@/errors';
import { StatusCodes } from 'http-status-codes';
import type { IUserRes } from '@/shared/types';

const getCurrentUser = async (req: Request, res: Response<IUserRes>): Promise<void | never> => {
  const userId = req.user._id

  const user = await User.findById(userId).select('-password')

  if (!user) {
    throw new NotFound('User not found')
  }

  res.status(StatusCodes.OK).json({  data: user, message: 'success' })
}

export {
  getCurrentUser
}
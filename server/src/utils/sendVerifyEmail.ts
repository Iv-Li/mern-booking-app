import { sendMail } from '@/utils/sendMail';
import * as process from 'process';

interface ISendVerifyEmail {
  email: string
  verificationToken: string
  origin: string
}
export const sendVerifyEmail = async ({ email, verificationToken, origin }: ISendVerifyEmail): Promise<void>  => {
  const verifyLink = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`
  const message = `<h1>Please confirm your email clickin on link: <a href="${verifyLink}">Confirm email</a></h1>`
  console.log({
    user: process.env.GOOGLE_USER,
    pass: process.env.GOOGLE_PASS,
  })
  await sendMail({
    to: email,
    subject: 'Email verification',
    text: message,
    html: message
  })
}
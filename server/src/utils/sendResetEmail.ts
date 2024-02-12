import { sendMail } from '@/utils/sendMail';

interface ISendResetEmail {
  email: string
  token: string
  origin: string
}

export const sendResetEmail = async ({ email, token, origin }: ISendResetEmail): Promise<void> => {
  const resetLink = `${origin}/user/reset-password?token=${token}&email=${email}`
  const message = `<h1>Please reset your password by clicking on link: <a href="${resetLink}">Reset password</a></h1>`

  await sendMail({
    to: email,
    subject: 'Reset Password Email',
    text: message,
    html: message
  })
}
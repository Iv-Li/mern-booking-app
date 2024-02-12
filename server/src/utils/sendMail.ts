import nodemailer, { type SendMailOptions } from 'nodemailer'
import { nodemailerConfig } from '@/utils/nodemailerConfig';
export const sendMail =  async ({ to, subject, text, html }: SendMailOptions): Promise<void> => {
  const transporter = nodemailer.createTransport(nodemailerConfig)

  await transporter.sendMail({
    from: {
      name: 'Iv.G.Holiday',
      address: process.env.GOOGLE_USER as string
    },
    to,
    subject,
    text,
    html
  })

}
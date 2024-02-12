import nodemailer, { type SendMailOptions } from 'nodemailer'
export const sendMail =  async ({ to, subject, text, html }: SendMailOptions): Promise<void> => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GOOGLE_USER,
      pass: process.env.GOOGLE_PASS,
    },
  })

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
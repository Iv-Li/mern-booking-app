import path from 'path';
import dotenv from 'dotenv'
// import 'module-alias/register'
import 'express-async-errors'
import express from 'express'
// import cors from 'cors'
import cookieParser from 'cookie-parser';
import morgan from 'morgan'

import connectDB from '@/db/connectDB';
import configCloudinary from '@/db/configCloudinary';
import { authRouter, myHotelsRouter } from '@/routes';
import { errorHandler } from '@/middleware';

const mainEnvFile = path.resolve(__dirname, '.env');
const additionalEnv = path.resolve(__dirname, `.env.${process.env.NODE_ENV}`);

dotenv.config({path: additionalEnv})
dotenv.config({path: mainEnvFile})

const app = express();
const PORT = process.env.PORT

// app.use(cors())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/my-hotels', myHotelsRouter)

app.use(errorHandler)


const start = async (): Promise<void> => {
  try {
    await connectDB()
    configCloudinary()
    const server = app.listen(PORT)

    const serverAdress = server.address();
    console.log({ serverAdress });
  } catch (err) {
    console.log(err)
  }
}

start().catch(err => {
  console.log(err)
})


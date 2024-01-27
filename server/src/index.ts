import path from 'path';

const mainEnvFile = path.resolve(__dirname, '.env');
const additionalEnv = path.resolve(__dirname, `.env.${process.env.NODE_ENV}`);

import dotenv from 'dotenv'
dotenv.config({path: additionalEnv})
dotenv.config({path: mainEnvFile})

//import 'module-alias/register'
import 'express-async-errors'

import express from 'express'
//import cors from 'cors'
import cookieParser from 'cookie-parser';
import morgan from 'morgan'

import connectDB from '@/db/connectDB';
import { authRouter } from '@/routes';
import { errorHandler } from '@/middleware';

const app = express();
const PORT = process.env.PORT

//app.use(cors())
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/auth', authRouter)

app.use(errorHandler)


const start = async () => {
  try {
    await connectDB()
    const server = app.listen(PORT)

    const serverAdress = server.address();
    console.log({ serverAdress });
  } catch (err) {
    console.log(err)
  }
}

start()


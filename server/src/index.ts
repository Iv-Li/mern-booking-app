const path = require('path')

const mainEnvFile = path.resolve(__dirname, '.env');
const additionalEnv = path.resolve(__dirname, `.env.${process.env.NODE_ENV}`);

import dotenv = require('dotenv')
dotenv.config({path: additionalEnv})
dotenv.config({path: mainEnvFile})

require('module-alias/register')

import express = require('express')

const app = express();
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})
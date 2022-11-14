import cors from 'cors'
import express, { Request, Response } from 'express'

import './db/mongoose'
import { errorHandler } from './middleware/errorHandler'
import { invalidPathHandler } from './middleware/invalidPathHandler'
import { authBaseUrl, authRouter } from './routes/auth.route'
import { eateryBaseUrl, eateryRouter } from './routes/eatery.route'
import logger from './utils/logger'

import axios from 'axios'
import fetch from 'node-fetch'

logger.info(`starting app in ${process.env.NODE_ENV} mode`)
const app = express()

app.use(cors())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.get('/', async (req: Request, res: Response) => {
  const ans = await fetch('http://localhost:8003/question/get/all')
  const json = await ans.json()
  console.log({ json })
  res.json({ json })
})

app.use(authBaseUrl, authRouter)
app.use(eateryBaseUrl, eateryRouter)

app.use(invalidPathHandler)

// this has to be the last loaded middleware.
app.use(errorHandler)

export default app

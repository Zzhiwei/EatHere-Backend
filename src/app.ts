import cors from 'cors'
import express, { Request, Response } from 'express'

import './db/mongoose'
import './db/redis'
import { errorHandler } from './middleware/errorHandler'
import { invalidPathHandler } from './middleware/invalidPathHandler'
import { authBaseUrl, authRouter } from './routes/auth.route'
import { eateryBaseUrl, eateryRouter } from './routes/eatery.route'
import logger from './utils/logger'

logger.info(`starting app in ${process.env.NODE_ENV} mode`)
const app = express()

app.use(cors())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('<h1>Welcome to eatery backend!</h1>')
})

app.use(authBaseUrl, authRouter)
app.use(eateryBaseUrl, eateryRouter)

app.use(invalidPathHandler)

// this has to be the last loaded middleware.
app.use(errorHandler)

export default app

import express, { NextFunction, Request, Response } from 'express'

import { config } from 'dotenv'
config()

// connect to db

const app = express()

import cors from 'cors'
app.use(cors())
import './db/mongoose'
import { eateryRouter } from './routes/eatery.route'
import { errorHandler } from './middleware/errorHandler'
import { invalidPathHandler } from './middleware/invalidPathHandler'
const port = process.env.PORT || '3000'

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)
// app.use('/', rou)

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>Hello Express!</h1>')
})

app.use('/eatery', eateryRouter)

app.use(invalidPathHandler)

// this has to be the last loaded middleware.
app.use(errorHandler)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})

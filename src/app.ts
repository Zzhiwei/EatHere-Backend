import cors from 'cors'
import express, { Request, Response } from 'express'
import './db/mongoose'
import { errorHandler } from './middleware/errorHandler'
import { invalidPathHandler } from './middleware/invalidPathHandler'
import { eateryRouter } from './routes/eatery.route'

const app = express()

app.use(cors())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('<h1>Hello Express!</h1>')
})

app.use('/eatery', eateryRouter)

app.use(invalidPathHandler)

// this has to be the last loaded middleware.
app.use(errorHandler)

export default app

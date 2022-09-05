import { NextFunction, Request, Response } from 'express'
import logger from '../utils/logger'

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(error)
  // define custom error handling here if any
  let status
  let message

  switch (error.name) {
    case 'ValidationError':
      status = 400
      message = 'incorrect fields in creating or updating object'
      break
    case 'EateryNotFoundError':
      status = 400
      message = 'cannot find eatery with this id'
      break
    case 'CastError':
      status = 400
      message = 'malformed id, please check your object or id'
      break
    default:
      status = 400
      message =
        'Something has gone wrong, please send us an email at e0544531@u.nus.edu '
  }
  res.status(status).json({
    error: message,
  })
}

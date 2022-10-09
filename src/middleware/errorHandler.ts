import { NextFunction, Request, Response } from 'express'
import logger from '../utils/logger'

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  logger.error({ error: error.name || error })
  // define custom error handling here if any
  let status
  let message

  switch (error.name) {
    case 'ValidationError':
      status = 400
      message = 'missing field or incorrect field type entered'
      break
    case 'EateryNotFoundError':
      status = 400
      message = 'cannot find eatery with this id'
      break
    case 'CastError':
      status = 400
      message = 'malformed id, please check your object or id'
      break
    case 'JsonWebTokenError':
      status = 401
      message = 'invalid token'
      break
    case 'TokenExpiredError':
      status = 401
      message = 'token expired'
      break
    default:
      status = 400
      message = 'Bad request: Please check your request'
  }
  res.status(status).json({
    error: message,
  })
}

import mongoose from 'mongoose'
import logger from '../utils/logger'

const url = process.env.MONGODB_URI

logger.info('connecting to', url)
mongoose
  .connect(url || '')
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB:', error.message)
  })

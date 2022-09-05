import mongoose from 'mongoose'
import config from '../utils/config'
import logger from '../utils/logger'

const url = config.MONGODB_URI

logger.info('connecting to', url)
mongoose
  .connect(url || '')
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB:', error.message)
  })

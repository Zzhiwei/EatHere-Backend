import { Eatery } from '../model/eatery.model'
import { faker } from '@faker-js/faker'
import mongoose from 'mongoose'
import logger from '../utils/logger'

const url =
  'mongodb+srv://CS3219:CS3219@cs3219.znysiko.mongodb.net/?retryWrites=true&w=majority'

mongoose
  .connect(url || '')
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB:', error.message)
  })

const priceRanges = ['CHEAP', 'AVERAGE', 'EXPENSIVE']

const user = '63521c62604d2a9068a557ec'

const seedEateries = async () => {
  for (let i = 0; i < 1000; i++) {
    const name = faker.company.name()
    const address = [
      faker.address.streetAddress(),
      faker.address.city(),
      faker.address.country(),
    ].join(', ')
    const priceRange = priceRanges[Math.floor(Math.random() * 3)]
    const eatery = new Eatery({ name, address, priceRange, user })
    await eatery.save()
    logger.info(`saved ${name}`)
  }
}

seedEateries()

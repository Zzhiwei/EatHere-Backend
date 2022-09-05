import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app'

const api = supertest(app)

test('should get hello express', async () => {
  await api.get('/').expect(200)
})

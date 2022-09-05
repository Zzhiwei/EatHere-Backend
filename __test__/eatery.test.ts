import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../src/app'
import { Eatery } from '../src/model/eatery.model'

const api = supertest(app)

const initialEateries = [
  {
    name: '369 Laksa',
    address: 'blk 333 Hougang',
  },
  {
    name: 'nice chicken rice',
    address: 'star vista',
  },
]

describe('test eatery API', () => {
  beforeEach(async () => {
    await Eatery.deleteMany({})
    let noteObject = new Eatery(initialEateries[0])
    await noteObject.save()
    noteObject = new Eatery(initialEateries[1])
    await noteObject.save()
  })

  test('should get specific eatery', async () => {
    let response = await api.get('/eatery/all')
    const { _id } = response.body[0]

    response = await api.get(`/eatery/${_id}`)
    expect(response.body._id).toBe(_id)
    expect(response.body.name).toBe('369 Laksa')
  }, 100000)

  test('should get all eateries', async () => {
    const response = await api
      .get('/eatery/all')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const [eatery1, eatery2] = response.body
    expect(eatery1.name).toBe(initialEateries[0].name)
    expect(eatery1.address).toBe(initialEateries[0].address)
    expect(eatery2.name).toBe(initialEateries[1].name)
    expect(eatery2.address).toBe(initialEateries[1].address)
  }, 100000)

  test('eatery should be added', async () => {
    const newEatery = {
      name: 'Ban mian store',
      address: 'AMK hub',
    }

    await api
      .post('/eatery/create')
      .send(newEatery)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/eatery/all')
    const [, , receivedNewEatery] = response.body
    expect(receivedNewEatery.name).toBe(newEatery.name)
    expect(receivedNewEatery.address).toBe(newEatery.address)
  }, 100000)

  test('eatery should be updated', async () => {
    const newEatery = {
      name: 'Ban mian store',
      address: 'AMK hub',
    }

    await api.post('/eatery/create').send(newEatery)

    let response = await api.get('/eatery/all')
    const { _id } = response.body[2]

    const updatedEatery = {
      name: 'super ban mian store',
      address: 'hougang',
    }

    await api.put(`/eatery/update/${_id}`).send({
      name: updatedEatery.name,
      address: updatedEatery.address,
    })

    response = await api.get('/eatery/all')
    const eatery = response.body[2]
    expect(eatery.name).toBe(updatedEatery.name)
    expect(eatery.address).toBe(updatedEatery.address)
  }, 100000)

  test('eatery should be deleted', async () => {
    let response = await api.get('/eatery/all')
    const { _id } = response.body[0]

    await api.delete(`/eatery/delete/${_id}`).expect(204)

    response = await api.get('/eatery/all')
    expect(response.body.length).toBe(1)
  }, 100000)

  it('should give error response if cannot find eatery', async () => {
    const response = await api.delete(`/eatery/delete/432714983`).expect(400)
    expect(response.body.error).toBe(
      'malformed id, please check your object or id'
    )
  }, 100000)

  test('eatery should not be added if no name', async () => {
    const newEatery = {
      address: 'AMK hub',
    }

    const response = await api
      .post('/eatery/create')
      .send(newEatery)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toBe(
      'incorrect fields in creating or updating object'
    )
  }, 100000)

  afterAll(() => {
    mongoose.connection.close()
  })
})

import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../src/app'
import { Eatery } from '../src/model/eatery.model'

const api = supertest(app)

const initialEateries = [
  {
    name: '369 Laksa',
    address: 'blk 333 Hougang',
    priceRange: 'AVERAGE',
  },
  {
    name: 'nice chicken rice',
    address: 'star vista',
    priceRange: 'AVERAGE',
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
    expect(response.body.name).toBe('nice chicken rice')
  })

  test('should get all eateries', async () => {
    const response = await api
      .get('/eatery/all')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const [eatery1, eatery2] = response.body
    expect(eatery2.name).toBe(initialEateries[0].name)
    expect(eatery2.address).toBe(initialEateries[0].address)
    expect(eatery1.name).toBe(initialEateries[1].name)
    expect(eatery1.address).toBe(initialEateries[1].address)
  })

  test('eatery should be added', async () => {
    const newEatery = {
      name: 'Ban mian store',
      address: 'AMK hub',
      priceRange: 'CHEAP',
    }

    await api
      .post('/eatery/create')
      .send(newEatery)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/eatery/all')
    const [receivedNewEatery] = response.body
    expect(receivedNewEatery.name).toBe(newEatery.name)
    expect(receivedNewEatery.address).toBe(newEatery.address)
  })

  test('eatery should be updated', async () => {
    const newEatery = {
      name: 'Ban mian store',
      address: 'AMK hub',
      priceRange: 'CHEAP',
    }

    await api.post('/eatery/create').send(newEatery)

    let response = await api.get('/eatery/all')
    const { _id } = response.body[0]

    const updatedEatery = {
      name: 'super ban mian store',
      address: 'hougang',
      priceRange: 'AVERAGE',
    }

    await api.put(`/eatery/update/${_id}`).send({
      name: updatedEatery.name,
      address: updatedEatery.address,
    })

    response = await api.get('/eatery/all')
    const eatery = response.body[0]
    expect(eatery.name).toBe(updatedEatery.name)
    expect(eatery.address).toBe(updatedEatery.address)
  })

  test('eatery should be deleted', async () => {
    let response = await api.get('/eatery/all')
    const { _id } = response.body[0]

    const { text } = await api
      .delete(`/eatery/delete/${_id}`)
      .expect(200)
      .expect('Content-Type', /json/)

    response = await api.get('/eatery/all')
    expect(response.body.length).toBe(1)
    expect(text).toBe('"DELETED"')
  })

  it('should give error response if eatery id is fewer than 24 characters', async () => {
    const response = await api.delete(`/eatery/delete/432714983`).expect(400)
    expect(response.body.error).toBe(
      'malformed id, please check your object or id'
    )
  })

  it('should give error response if cannot find id', async () => {
    const response = await api
      .delete(`/eatery/delete/63243e92b855e2d1568a65c2`)
      .expect(400)
    expect(response.body.error).toBe('cannot find eatery with this id')
  })

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
      'missing field or incorrect field type entered'
    )
  })

  afterAll(() => {
    mongoose.connection.close()
  })
})

const request = require('supertest')
const app = require('../../../index');

describe('GET products', () => {
  it('should get all products', async () => {
    const res = await request(app).get('/products')
    expect(res.statusCode).toEqual(200)
    // expect(res.body).toHaveProperty('product')
  })
})
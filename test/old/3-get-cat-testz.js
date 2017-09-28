const test = require('tape')
const request = require('supertest')
const app = require('../../app.js')
const { omit, compose, prop } = require('ramda')

test('GET /cats/:id', assert => {
  request(app)
    .get('/cats/cat_mr_x_owner_ottinger_william_0105')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      const actualThing = {
        _id: 'cat_mr_x_owner_ottinger_william_0105',
        type: 'cat',
        name: 'Mr X',
        ownerId: 'owner_ottinger_william_0105',
        breed: 'Siamese',
        gender: 'M'
      }
      assert.equals(prop('statusCode', res), 200, 'Status Code 200')
      assert.error(err, 'No error')
      const retrievedCat = compose(omit(['_rev']), prop('body'))(res)
      assert.same(actualThing, retrievedCat, 'Retrieved expected cat')
      assert.end()
    })
})

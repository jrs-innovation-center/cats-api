const test = require('tape')
const request = require('supertest')
const app = require('../../app.js')
const { prop } = require('ramda')

// body

// response - 201 created
// {
//     "ok": true,
//     "id": "cat_mr_x_owner_ottinger_william_0105",
//     "rev": "1-e0b6aed427f83f61d5d665c324c65b6b"
// }

test('POST /cats', function(assert) {
  var newThing = {
    type: 'cat',
    name: 'Mr X',
    ownerId: 'owner_ottinger_william_0105',
    breed: 'Siamese',
    gender: 'M'
  }
  request(app)
    .post('/cats')
    .send(newThing)
    .expect(201)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      const addedCat = prop('body', res)
      const statusCode = prop('statusCode', res)
      const addedCatId = prop('id', addedCat)
      const addedCatOK = prop('ok', addedCat)
      assert.equals(statusCode, 201, `Status Code: ${statusCode}`)
      assert.error(err, 'No error')
      assert.equals(
        addedCatId,
        'cat_mr_x_owner_ottinger_william_0105',
        'PK value ok.'
      )
      assert.equals(addedCatOK, true, 'expected "ok" value is true')
      assert.end()
    })
})

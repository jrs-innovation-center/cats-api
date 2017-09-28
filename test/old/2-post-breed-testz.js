const test = require('tape')
const request = require('supertest')
const app = require('../../app.js')
const { prop, path } = require('ramda')

// body

// response - 201 created
// {
//     "ok": true,
//     "id": "cat_mr_x_owner_ottinger_william_0105",
//     "rev": "1-e0b6aed427f83f61d5d665c324c65b6b"
// }

test('POST /breeds', function(assert) {
  var newThing = {
    type: 'breed',
    breed: 'Maine Coon',
    desc:
      'The Maine Coon is one of the largest domesticated breeds of cat. It has a distinctive physical appearance and valuable hunting skills.'
  }
  request(app)
    .post('/breeds')
    .send(newThing)
    .expect(201)
    .expect('Content-Type', /json/)
    .end(function(err, res) {
      assert.equals(
        prop('statusCode', res),
        201,
        `Status Code: ${prop('statusCode', res)}`
      )
      assert.error(err, 'No error')
      assert.equals(
        path(['body', 'id'], res),
        'cat_mr_x_owner_ottinger_william_0105',
        'PK value ok.'
      )
      assert.equals(
        path(['body', 'ok'], res),
        true,
        'expected "ok" value is true'
      )
      assert.end()
    })
})

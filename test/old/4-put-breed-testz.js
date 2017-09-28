const test = require('tape')
const request = require('supertest')
const app = require('../../app.js')
const { prop, compose, omit, merge, __, path } = require('ramda')

// body

// response - 201 created
// {
//     "ok": true,
//     "id": "cat_mr_x_owner_ottinger_william_0105",
//     "rev": "1-e0b6aed427f83f61d5d665c324c65b6b"
// }

test('PUT /cats', function(assert) {
  request(app)
    .get('/cats/cat_mr_x_owner_ottinger_william_0105')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      const updatedCat = compose(merge(__, { breed: 'Tabby' }), prop('body'))(
        res
      )
      request(app)
        .put('/cats/cat_mr_x_owner_ottinger_william_0105')
        .send(updatedCat)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(res => {
          const updatedCatResult = compose(omit(['rev']), prop('body'))(res)
          const statusCode = prop('statusCode', res)
          const updatedCatOK = prop('ok', updatedCatResult)
          const updatedCatId = prop('id', updatedCatResult)
          assert.equals(
            statusCode,
            200,
            `updatedCat Cat Status Code: ${statusCode}`
          )
          assert.error(err, 'No error')
          assert.equals(
            updatedCatId,
            'cat_mr_x_owner_ottinger_william_0105',
            'PK value ok.'
          )
          assert.equals(updatedCatOK, true, 'expected "ok" value is true')

          request(app)
            .delete('/cats/cat_mr_x_owner_ottinger_william_0105')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
              const deletedCat = prop('body', res)
              assert.error(err, 'No error')
              assert.deepEqual(
                prop('id', deletedCat),
                'cat_mr_x_owner_ottinger_william_0105'
              )
              assert.equals(prop('ok', deletedCat), true)
            })
        })
        .catch(err => console.log(err))
      assert.end()
    })
})

const test = require('tape')
const request = require('supertest')
const app = require('../../app.js')
const { prop, compose, omit, merge, __ } = require('ramda')

test('CATS CRUD TEST', function(assert) {
  // CREATE A CAT
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
    .then(res => {
      assert.equals(
        prop('id', prop('body', res)),
        'cat_mr_x_owner_ottinger_william_0105',
        'POST expected PK value passed.'
      )
      assert.equals(
        prop('ok', prop('body', res)),
        true,
        'POST expected "ok" value passed'
      )
      return prop('id', prop('body', res))
    })
    .then(
      pk =>
        new Promise((resolve, reject) => {
          request(app)
            .get(`/cats/${pk}`)
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
              const actualThing = {
                _id: pk,
                type: 'cat',
                name: 'Mr X',
                ownerId: 'owner_ottinger_william_0105',
                breed: 'Siamese',
                gender: 'M'
              }
              assert.equals(
                prop('statusCode', res),
                200,
                `GET Status Code: ${prop('statusCode', res)}`
              )
              const retrievedCat = compose(omit(['_rev']), prop('body'))(res)
              assert.same(
                actualThing,
                retrievedCat,
                'GET retrieved expected cat'
              )

              resolve(prop('body', res))
            })
            .catch(err => reject(err))
        })
    )
    .then(
      body =>
        new Promise((resolve, reject) => {
          /////// UPDATE breed to Tabby
          request(app)
            .put('/cats/cat_mr_x_owner_ottinger_william_0105')
            .send(merge(body, { breed: 'Tabby' }))
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
              const updatedCatResult = compose(omit(['rev']), prop('body'))(res)

              const updatedCatOK = prop('ok', updatedCatResult)
              const updatedCatId = prop('id', updatedCatResult)
              assert.equals(
                prop('statusCode', res),
                200,
                `PUT Status Code: ${prop('statusCode', res)}`
              )

              assert.equals(
                updatedCatId,
                'cat_mr_x_owner_ottinger_william_0105',
                'PUT expected PK value passed.'
              )
              assert.equals(
                updatedCatOK,
                true,
                'PUT expected "ok" value passed.'
              )

              resolve(prop('body', res))
            })
            .catch(err => reject(err))
        })
    )
    .then(
      body =>
        new Promise((resolve, reject) => {
          /////// DELETE
          request(app)
            .delete('/cats/cat_mr_x_owner_ottinger_william_0105')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
              const deletedCat = prop('body', res)
              assert.equals(
                prop('id', deletedCat),
                'cat_mr_x_owner_ottinger_william_0105',
                'DELETE expected PK value passed.'
              )

              assert.equals(
                prop('ok', deletedCat),
                true,
                'DELETE expected "ok" value passed.'
              )
              resolve(prop('body', res))
            })
            .catch(err => reject(err))
        })
    )
    .catch(err => console.log(err))
  assert.end()
})

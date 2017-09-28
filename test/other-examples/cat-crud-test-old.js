const test = require('tape')
const request = require('supertest')
const app = require('../../app.js')
const { merge } = require('ramda')
const testGet = require('../lib/test-get')
const testPut = require('../lib/test-put')
const testPost = require('../lib/test-post')
const testDelete = require('../lib/test-delete')

test('CATS CRUD TEST', function(assert) {
  var requestBody = {
    type: 'cat',
    name: 'Mr X',
    ownerId: 'owner_ottinger_william_0105',
    breed: 'Siamese',
    gender: 'M'
  }

  testPost(assert, `/cats`, requestBody, 'cat_mr_x_owner_ottinger_william_0105')
    .then(body =>
      testGet(assert, `/cats/${body.id}`, merge(requestBody, { _id: body.id }))
    )
    .then(body =>
      testPut(assert, `/cats/${body._id}`, merge(body, { breed: 'Tabby' }))
    )
    .then(body => testDelete(assert, `/cats/${body.id}`, body.id))
    .catch(err => console.log(err))

  assert.end()
})

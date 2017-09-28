const test = require('tape')
const request = require('supertest')
const app = require('../../app.js')
const { merge } = require('ramda')
const testGet = require('../lib/test-get')
const testPut = require('../lib/test-put')
const testPost = require('../lib/test-post')
const testDelete = require('../lib/test-delete')

test('BREEDS CRUD TEST', function(assert) {
  var requestBody = {
    type: 'breed',
    breed: 'Maine Coon',
    desc:
      'The Maine Coon is one of the largest domesticated breeds of cat. It has a distinctive physical appearance and valuable hunting skills.'
  }

  testPost(assert, `/breeds`, requestBody, 'breed_maine_coon')
    .then(body =>
      testGet(
        assert,
        `/breeds/${body.id}`,
        merge(requestBody, { _id: body.id })
      )
    )
    .then(body =>
      testPut(
        assert,
        `/breeds/${body._id}`,
        merge(body, { desc: 'The description has been changed' })
      )
    )
    .then(body => testDelete(assert, `/breeds/${body.id}`, body.id))
    .catch(err => console.log(err))

  assert.end()
})

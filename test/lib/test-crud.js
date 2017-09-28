const test = require('tape')
const request = require('supertest')
const app = require('../../app.js')
const { merge } = require('ramda')
const testGet = require('./test-get')
const testPut = require('./test-put')
const testPost = require('./test-post')
const testDelete = require('./test-delete')

/*
example call testCrud('BREEDS CRUD TEST',
  '/breeds',
  {
  type: 'breed',
  breed: 'Maine Coon',
  desc:
    'The Maine Coon is one of the largest domesticated breeds of cat. It has a distinctive physical appearance and valuable hunting skills.'
  },
  { desc: 'The description has been changed' },
  'breed_maine_coon'
)

*/
module.exports = (testName, path, postRequestBody, putUpdateData, pk) => {
  return new Promise((resolve, reject) => {
    test(testName, function(assert) {
      testPost(assert, path, postRequestBody, pk)
        .then(body =>
          testGet(
            assert,
            `${path}/${body.id}`,
            merge(postRequestBody, { _id: body.id })
          )
        )
        .then(body =>
          testPut(assert, `${path}/${body._id}`, merge(body, putUpdateData))
        )
        .then(body => testDelete(assert, `${path}/${body.id}`, body.id))
        .then(body => resolve(body))
        .then(() => assert.end())
        .catch(err => reject(err))
    })
  })
}

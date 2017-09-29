const test = require('tape')
//const request = require('supertest')
//const app = require('../../app.js')
const { merge, compose, append, __, head } = require('ramda')
const testGet = require('./test-get')
const testPut = require('./test-put')
const testPost = require('./test-post')
const testDelete = require('./test-delete')

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

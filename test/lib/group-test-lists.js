const test = require('tape')
const { prop } = require('ramda')
const testPost = require('./test-post')
const testList = require('./test-list')
const testDelete = require('./test-delete')

module.exports = (testName, path, requestBodies, compareList, pks) => {
  return new Promise((resolve, reject) => {
    test(testName, function(assert) {
      testPost(assert, path, requestBodies[0], pks[0])
        .then(body => testPost(assert, path, requestBodies[1], pks[1]))
        .then(body =>
          testList(assert, path, compareList, prop('length', requestBodies))
        )
        .then(body => testDelete(assert, `${path}/${pks[0]}`, pks[0]))
        .then(body => testDelete(assert, `${path}/${pks[1]}`, pks[1]))
        .then(body => resolve(body))
        .then(() => assert.end())
        .catch(err => reject(err))
    })
  })
}

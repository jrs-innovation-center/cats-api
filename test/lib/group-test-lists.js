const test = require('tape')
const { prop, merge, map } = require('ramda')
const testPosts = require('./test-posts')
const testList = require('./test-list')
const testDeletes = require('./test-deletes')

module.exports = (testName, path, requestBodies) => {
  return new Promise((resolve, reject) => {
    test(testName, function(assert) {
      testPosts(assert, path, requestBodies)
        .then(body =>
          testList(assert, path, requestBodies, prop('length', requestBodies))
        )
        .then(docs =>
          testDeletes(
            assert,
            map(doc => merge(doc, { path: `${path}/${doc._id}` }), docs)
          )
        )
        .then(body => resolve(body))
        .then(() => assert.end())
        .catch(err => reject(err))
    })
  })
}

// .then(function(arrayOfResults) {
//   // All docs have really been removed() now!
// })

// module.exports = (testName, path, requestBodies, compareList, pks) => {
//   return new Promise((resolve, reject) => {
//     test(testName, function(assert) {
//       testPost(assert, path, requestBodies[0], pks[0])
//         .then(body => testPost(assert, path, requestBodies[1], pks[1]))
//         .then(body =>
//           testList(assert, path, compareList, prop('length', requestBodies))
//         )
//         .then(body => testDelete(assert, `${path}/${pks[0]}`, pks[0]))
//         .then(body => testDelete(assert, `${path}/${pks[1]}`, pks[1]))
//         .then(body => resolve(body))
//         .then(() => assert.end())
//         .catch(err => reject(err))
//     })
//   })
// }

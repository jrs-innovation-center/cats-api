const request = require('supertest')
const app = require('../../app.js')
const { prop, compose, omit, map } = require('ramda')

module.exports = (assert, deleteItems) => {
  return Promise.all(
    map(
      deleteItem =>
        new Promise((resolve, reject) => {
          request(app)
            .delete(deleteItem.path)
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
              const deletedResponse = prop('body', res)
              assert.equals(
                prop('id', deletedResponse),
                deleteItem._id,
                `DELETE ${deleteItem.path} expected PK value passed.`
              )

              assert.equals(
                prop('ok', deletedResponse),
                true,
                `DELETE ${deleteItem.path} expected "ok" value passed.`
              )
              resolve(prop('body', res))
            })
            .catch(err => reject(err))
        }),
      deleteItems
    )
  )
}

// db
//   .allDocs({ include_docs: true })
//   .then(function(result) {
//     return Promise.all(
//       result.rows.map(function(row) {
//         return db.remove(row.doc)
//       })
//     )
//   })
//   .then(function(arrayOfResults) {
//     // All docs have really been removed() now!
//   })

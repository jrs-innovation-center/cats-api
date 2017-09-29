const request = require('supertest')
const app = require('../../app.js')
const { prop, compose, omit, map } = require('ramda')

module.exports = (assert, path, requestBodies) => {
  return Promise.all(
    map(
      requestBody =>
        new Promise((resolve, reject) => {
          request(app)
            .post(path)
            .send(omit('_id', requestBody))
            .expect(201)
            .expect('Content-Type', /json/)
            .then(res => {
              assert.equals(
                prop('id', prop('body', res)),
                prop('_id', requestBody),
                `POST ${path} expected PK value passed.`
              )
              assert.equals(
                prop('ok', prop('body', res)),
                true,
                `POST ${path} expected "ok" value passed`
              )
              resolve(prop('body', res))
            })
            .catch(err => reject(err))
        }),
      requestBodies
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

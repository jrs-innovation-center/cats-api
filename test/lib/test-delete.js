const request = require('supertest')
const app = require('../../app.js')
const { prop, compose, omit } = require('ramda')

module.exports = (assert, path, pk) => {
  return new Promise((resolve, reject) => {
    request(app)
      .delete(path)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        const deletedResponse = prop('body', res)
        assert.equals(
          prop('id', deletedResponse),
          pk,
          `DELETE ${path} expected PK value passed.`
        )

        assert.equals(
          prop('ok', deletedResponse),
          true,
          `DELETE ${path} expected "ok" value passed.`
        )
        resolve(prop('body', res))
      })
      .catch(err => reject(err))
  })
}

const request = require('supertest')
const app = require('../../app.js')
const { prop, compose, omit } = require('ramda')

module.exports = (assert, path, compareResourse) => {
  return new Promise((resolve, reject) => {
    request(app)
      .get(path)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        assert.equals(
          prop('statusCode', res),
          200,
          `GET ${path} Status Code: ${prop('statusCode', res)}`
        )
        assert.same(
          compareResourse,
          compose(omit(['_rev']), prop('body'))(res),
          `GET ${path} retrieved expected resource`
        )

        resolve(prop('body', res))
      })
      .catch(err => reject(err))
  })
}
